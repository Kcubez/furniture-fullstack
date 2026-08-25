import { authApi } from "@/api";
import {
  postInfiniteQuery,
  postQuery,
  productQuery,
  queryClient,
  onePostQuery,
  categoryTypeQuery,
  productInfiniteQuery,
} from "@/api/query";
import useAuthStore, { Status } from "@/store/authStore";
import { redirect, type LoaderFunctionArgs } from "react-router";

// export const homeLoader = async () => {
//   try {
//     const products = await api.get("users/products?limit=8");
//     const posts = await api.get("users/posts/infinite?limit=3");

//     // const [products, posts] = await Promise.all([
//     //   await api.get("users/products?limit=8"),
//     //   await api.get("users/posts/infinite?limit=3"),
//     // ]);

//     return { productsData: products.data, postsData: posts.data };
//   } catch (error) {
//     console.log("homeLoader error", error);
//   }
// };

export const homeLoader = async () => {
  await queryClient.ensureQueryData(productQuery("?limit=8"));
  await queryClient.ensureQueryData(postQuery("?limit=3"));
  return null;
};

export const loginLoader = async () => {
  try {
    const response = await authApi.get("auth-check");
    if (response.status !== 200) {
      return null;
    }
    return redirect("/");
  } catch (error) {
    console.log("loginLoader error", error);
  }
};

export const otpLoader = async () => {
  const authStore = useAuthStore.getState();
  if (authStore.status !== Status.otp) {
    return redirect("/register");
  }
  return null;
};

export const confirmLoader = async () => {
  const authStore = useAuthStore.getState();
  if (authStore.status !== Status.confirm) {
    return redirect("/register");
  }
  return null;
};

// 1. Login Success --> loader (fetching data) --> home screen
// 2. Login Success --> Home Screen --> useQuery (cache after fetching data)
// 3. Login Success --> loader (cache after fetching data) --> home screen

// tanstack query
// RTK query (redux-toolkit)

export const blogInfiniteLoader = async () => {
  await queryClient.ensureInfiniteQueryData(postInfiniteQuery());
  return null;
};

export const postLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.postId) {
    throw new Error("No Post ID provided");
  }
  await queryClient.ensureQueryData(postQuery("?limit=6"));
  await queryClient.ensureQueryData(onePostQuery(Number(params.postId)));
  return { postId: params.postId };
};

export const productInfiniteLoader = async () => {
  await queryClient.ensureQueryData(categoryTypeQuery());
  await queryClient.prefetchInfiniteQuery(productInfiniteQuery());
  return null;
};
