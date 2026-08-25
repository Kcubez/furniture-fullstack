import { createBrowserRouter, redirect } from "react-router";
import { lazy, Suspense } from "react";

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/Error";
// import BlogPage from "./pages/blogs/Blog";
// import BlogDetail from "./pages/blogs/BlogDetail";
// import BlogRootLayout from "./pages/blogs/BlogRootLayout";

const BlogRootLayout = lazy(() => import("./pages/blogs/BlogRootLayout"));
const BlogPage = lazy(() => import("./pages/blogs/Blog"));
const BlogDetail = lazy(() => import("./pages/blogs/BlogDetail"));

import ProductRootLayout from "./pages/products/ProductRootLayout";
import ProductPage from "./pages/products/Product";
import ProductDetail from "./pages/products/ProductDetail";
import Login from "./pages/auth/Login";
import {
  blogInfiniteLoader,
  confirmLoader,
  homeLoader,
  loginLoader,
  otpLoader,
  postLoader,
} from "./router/loader";
import {
  confirmAction,
  loginAction,
  logoutAction,
  otpAction,
  registerAction,
} from "./router/action";
import AuthRootLayout from "./pages/auth/AuthRootLayout";
import SignUpPage from "./pages/auth/SignUp";
import OtpPage from "./pages/auth/Otp";
import ConfirmPasswordPage from "./pages/auth/ConfirmPassword";

const SuspenseFallBack = () => <div className="text-center">Loading...</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <Error />,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
      },
      { path: "about", element: <AboutPage /> },
      {
        path: "blogs",
        element: (
          <Suspense fallback={<SuspenseFallBack />}>
            <BlogRootLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<SuspenseFallBack />}>
                <BlogPage />
              </Suspense>
            ),
            loader: blogInfiniteLoader,
          },
          {
            path: ":postId",
            element: (
              <Suspense fallback={<SuspenseFallBack />}>
                <BlogDetail />
              </Suspense>
            ),
            loader: postLoader,
          },
        ],
      },
      {
        path: "products",
        element: <ProductRootLayout />,
        children: [
          { index: true, element: <ProductPage /> },
          { path: ":productId", element: <ProductDetail /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
    loader: loginLoader,
  },
  {
    path: "/register",
    element: <AuthRootLayout />,
    children: [
      {
        index: true,
        element: <SignUpPage />,
        loader: loginLoader,
        action: registerAction,
      },
      {
        path: "otp",
        element: <OtpPage />,
        loader: otpLoader,
        action: otpAction,
      },
      {
        path: "confirm-password",
        element: <ConfirmPasswordPage />,
        loader: confirmLoader,
        action: confirmAction,
      },
    ],
  },
  {
    path: "/logout",
    action: logoutAction,
    loader: () => redirect("/"),
  },
]);
