import { Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { errorCode } from '../../../config/errorCode';
import { checkUserIfNotExists } from '../../utils/auth';
import { createError } from '../../utils/error';
import { getUserById } from '../../services/authService';
import { getOrSetCache } from '../../utils/cache';
import { checkModelIfExist } from '../../utils/check';
import {
  getCategoryList,
  getProductsList,
  getProductWithRelations,
  getTypeList,
} from '../../services/productService';
import { addProductToFavourite, removeProductFromFavourite } from '../../services/userService';
import cacheQueue from '../../jobs/queues/cacheQueue';

interface CustomRequest extends Request {
  userId?: number;
}

export const getProduct = [
  param('id', 'Product ID is required').isInt({ gt: 0 }),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0]?.msg, 400, errorCode.invalid));
    }

    // Additional logic for creating a product goes here
    const productId = req.params.id;
    const userId = req.userId;
    const user = await getUserById(userId!);
    checkUserIfNotExists(user);

    // const product = await getProductWithRelations(+productId!); // "7" -> 7
    const cacheKey = `products:${JSON.stringify(+productId!)}`;
    const product = await getOrSetCache(cacheKey, async () => {
      return await getProductWithRelations(+productId!, userId!);
    });

    checkModelIfExist(product);

    res.status(200).json({
      message: req.t('Product details fetched successfully'),
      product,
    });
  },
];

export const getProductsByPagination = [
  query('cursor', 'cursor must be product ID').optional().isInt({ gt: 0 }),
  query('limit', 'limit number must be a positive integer').isInt({ gt: 3 }).optional(),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0]?.msg, 400, errorCode.invalid));
    }

    // Additional logic for creating a product goes here
    const lastCursor = req.query.cursor;
    const limit = req.query.limit || 5;
    const category = req.query.category;
    const type = req.query.type;

    const userId = req.userId;
    const user = await getUserById(userId!);
    checkUserIfNotExists(user);

    let categoryList: number[] = [];
    let typeList: number[] = [];

    if (category) {
      categoryList = category
        .toString()
        .split(',')
        .map(c => Number(c))
        .filter(c => c > 0);
    }
    if (type) {
      typeList = type
        .toString()
        .split(',')
        .map(t => Number(t))
        .filter(t => t > 0);
    }

    const where = {
      AND: [
        categoryList.length > 0 ? { categoryId: { in: categoryList } } : {},
        typeList.length > 0 ? { typeId: { in: typeList } } : {},
      ],
    };

    const options = {
      where,
      take: Number(limit) + 1,
      skip: lastCursor ? 1 : 0,
      cursor: lastCursor ? { id: Number(lastCursor) } : undefined,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        discount: true,
        status: true,
        images: {
          select: {
            id: true,
            path: true,
          },
          take: 1, //only get first image
        },
      },
      orderBy: {
        id: 'asc',
      },
    };

    const cacheKey = `products:${JSON.stringify(req.query)}`;
    const products = await getOrSetCache(cacheKey, async () => {
      return await getProductsList(options);
    });

    const hasNextPage = products.length > Number(limit); //6>5 true //
    if (hasNextPage) {
      products.pop(); //remove last item
    }

    const nextCursor = products.length > 0 ? products[products.length - 1]?.id : null;

    res.status(200).json({
      message: req.t('Get All infinite products by pagination successfully'),
      hasNextPage,
      nextCursor,
      preCursor: lastCursor,
      products,
    });
  },
];

export const getCategoryType = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const user = await getUserById(userId!);
  checkUserIfNotExists(user);

  const categories = await getCategoryList();
  const types = await getTypeList();

  res.status(200).json({
    message: 'Category and Types',
    categories,
    types,
  });
};

export const toggleFavorite = [
  body('productId', 'ProductId must not be empty').isInt({ gt: 0 }),
  body('favourite', 'Favourite must not be empty').isBoolean(),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0]?.msg, 400, errorCode.invalid));
    }

    const userId = req.userId;
    const user = await getUserById(userId!);
    checkUserIfNotExists(user);

    const { productId, favourite } = req.body;
    if (favourite) {
      await addProductToFavourite(user!.id, productId);
    } else {
      await removeProductFromFavourite(user!.id, productId);
    }

    await cacheQueue.add(
      'invalidate-product-cache',
      {
        pattern: 'products:*',
      },
      {
        jobId: `invalidate-product-cache-${Date.now()}`,
        priority: 1,
      }
    );
    res.status(200).json({
      message: favourite
        ? 'Product added to favourites successfully'
        : 'Product removed from favourites successfully',
    });
  },
];
