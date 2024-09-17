import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaStar } from "react-icons/fa"; // Import star icons
import { useState } from "react"; // Use state to control star selection
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/shared/LoadingButton/LoadingButton";
import { useCreateReviewMutation } from "@/redux/api/features/review/reviewApi";

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(3, { message: "Enter your full name" }),
  email: z
    .string()
    .min(1, { message: "This field must be filled" })
    .email("This is not a valid email"),
  comment: z.string().min(6, { message: "Enter a valid comment" }),
});

const ReviewForm = ({ ProductId }: { ProductId: string }) => {
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const cart = useAppSelector((state) => state.cart);
  const router = useRouter();
  const [rating, setRating] = useState<number>(0); // Local state for the rating
  const [hover, setHover] = useState<number>(0); // Hover state to change star color on hover

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const reviewData = {
      name: values.name,
      email: values.email,
      comment: values.comment,
      rating, // Include the rating
    };

    try {
      const res = await createReview({
        body: reviewData,
        id: ProductId,
      }).unwrap();
      console.log(res);

      toast.success("Review placed successfully", { position: "bottom-left" });
    } catch (error) {
      toast.error((error as any)?.data?.message || "An error occurred", {
        position: "bottom-left",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full space-y-4 py-6">
          <div className="space-y-4">
            {/* Rating field */}
            <div className="w-full leading-4">
              <FormLabel
                className={cn("font-semibold text-[16px] text-gray-800")}
              >
                Your Rating
              </FormLabel>
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        className="hidden"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                      />
                      <FaStar
                        className={cn(
                          "cursor-pointer transition-colors duration-200 w-4 h-4",
                          ratingValue <= (hover || rating)
                            ? "text-primary"
                            : "text-gray-300"
                        )}
                        size={24}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Comment field */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className={cn("w-full leading-3")}>
                  <FormLabel
                    className={cn("font-semibold text-[16px] text-gray-900")}
                  >
                    Your Review
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      className={cn(
                        "font-semibold rounded-[5px] border border-gray-300",
                        "focus:outline-none focus:ring-2 focus:ring-none focus:border-none",
                        "transition duration-300 ease-in-out"
                      )}
                      placeholder="Write your comment"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Name and Email fields */}
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className={cn("w-full leading-3")}>
                    <FormLabel
                      className={cn("font-semibold text-[16px] text-gray-800")}
                    >
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className={cn(
                          "font-semibold rounded-[5px] border border-gray-300",
                          "focus:outline-none focus:ring-2 focus:ring-none focus:border-none",
                          "transition duration-300 ease-in-out"
                        )}
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className={cn("w-full leading-3")}>
                    <FormLabel
                      className={cn("font-semibold text-[16px] text-gray-800")}
                    >
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className={cn(
                          "font-semibold rounded-[5px] border border-gray-300",
                          "focus:outline-none focus:ring-2 focus:ring-none focus:border-none",
                          "transition duration-300 ease-in-out"
                        )}
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit button */}
          <LoadingButton
            type="submit"
            className="font-bold uppercase"
            loading={isLoading}
          >
            Submit
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default ReviewForm;
