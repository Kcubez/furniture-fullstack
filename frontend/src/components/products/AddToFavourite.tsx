import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

interface AddToFavouriteProps extends ButtonProps {
  productId: string;
  rating?: number;
  className?: string;
}

function AddToFavourite({
  productId,
  rating,
  className,
  ...props
}: AddToFavouriteProps) {
  return (
    <div>
      <Button
        variant="secondary"
        size="icon"
        className={cn("size-8 shrink-0", className)}
        {...props}
      >
        <Icons.heart className="size-4" />
      </Button>
    </div>
  );
}
export default AddToFavourite;
