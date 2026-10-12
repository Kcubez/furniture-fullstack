import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

export const addProductToFavourite = async (userId: number, productId: number) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      products: {
        connect: { id: productId },
      },
    },
  });
};

export const removeProductFromFavourite = async (userId: number, productId: number) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      products: {
        disconnect: { id: productId },
      },
    },
  });
};
