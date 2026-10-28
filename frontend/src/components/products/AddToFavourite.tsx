import { useFetcher } from "react-router";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

interface AddToFavouriteProps extends ButtonProps {
  productId: string;
  rating?: number;
  className?: string;
  isFavourite: boolean;
}

function AddToFavourite({
  productId,
  rating,
  className,
  isFavourite,
  ...props
}: AddToFavouriteProps) {
  const fetcher = useFetcher({ key: `product:${productId}-favourite` });

  let favourite = isFavourite;
  if (fetcher.formData) {
    favourite = fetcher.formData.get("favourite") === "true";
  }

  return (
    <fetcher.Form method="post">
      {" "}
      <Button
        variant="secondary"
        size="icon"
        className={cn("size-8 shrink-0", className)}
        name="favourite"
        value={favourite ? "false" : "true"}
        title={favourite ? "Remove from favourites" : "Add to favourites"}
        {...props}
      >
        {favourite ? (
          <Icons.heartFilled className="size-4 text-red-500" />
        ) : (
          <Icons.heart className="size-4" />
        )}
      </Button>{" "}
    </fetcher.Form>
  );
}
export default AddToFavourite;
