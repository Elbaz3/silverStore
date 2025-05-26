import { TLoading } from "@customTypes/shared";
import React from "react";
import {
  CategorySkeleton,
  ProductSkeleton,
  CartSkeleton,
  TableSkeleton,
} from "../skeletons";
import LottieHandler from "../LottieHandler/LottieHandler";

const skeletonTypes = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
  table: TableSkeleton,
};

interface ILoadingProps {
  loading: TLoading;
  error: string | null;
  children: React.ReactNode;
  type?: keyof typeof skeletonTypes;
}

const Loading = ({
  loading,
  error,
  children,
  type = "category",
}: ILoadingProps) => {
  const Skeleton = skeletonTypes[type];

  if (loading === "pending") {
    return <Skeleton />;
  }
  if (loading === "failed") {
    return <h1>{<LottieHandler type="error" message={error} />}</h1>;
  }

  return <div>{children}</div>;
};

export default Loading;
