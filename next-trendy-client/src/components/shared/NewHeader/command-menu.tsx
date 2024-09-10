


"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { type DialogProps } from "@radix-ui/react-dialog";
import { useGetAllProductsQuery } from "@/redux/api/features/product/productApi";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
type Product = {
  name: string;
  category: string;
  subCategory: string;
  variant: { variant: { color: string }[] }[];
  tag?: string[];
};

type ProductsResponse = {
  Products: Product[];
};

export function CommandMenu({ ...props }: DialogProps) {
  const { data, isLoading } = useGetAllProductsQuery({});
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  // Utility function to get unique values
  const getUniqueValues = <T, K extends keyof T>(
    arr: T[],
    key: K
  ): string[] => {
    // Extract values for the specified key
    const values = arr
      .map((item) => {
        const value = item[key];
        if (Array.isArray(value)) {
          return value.map((v) => String(v)); // Convert array elements to strings
        }
        return value !== undefined ? String(value) : ""; // Convert single value to string or handle undefined
      })
      .flat(); // Flatten the array

    // Filter out any empty strings (if needed)
    return [...new Set(values.filter((value) => value.trim() !== ""))];
  };

  // Get unique product colors from variant
  const getUniqueColors = (products: Product[]): string[] => {
    const colors = products.flatMap((product) =>
      product.variant.flatMap((variant) => variant.variant.map((v) => v.color))
    );
    return [...new Set(colors.filter((color) => color !== undefined))];
  };

  // Get unique tags from products
  const getUniqueTags = (products: Product[]): string[] => {
    const tags = products.flatMap((product) =>
      product.tag ? product.tag : []
    );
    return [...new Set(tags.filter((tag) => tag !== undefined))];
  };

  // Function to handle live typing (updating URL without navigation)
  const updateQueryInURL = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  // Handle typing input for live search
  const handleInputChange = (term: string) => {
    setSearchTerm(term);
    updateQueryInURL(term); // Update URL without navigation
  };

  // Handle the enter key press or clicking suggestion (trigger actual navigation)
  const handleSearchSubmit = () => {
    if (searchTerm) {
      router.push(`/product?q=${encodeURIComponent(searchTerm)}`);
      setOpen(false); // Close search dialog after submission
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search products...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          value={searchTerm}
          onValueChange={(term) => handleInputChange(term)} // Handle typing without navigation
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchSubmit(); // Trigger search on Enter key press
            }
          }}
        />
        <CommandList>
          <CommandEmpty>No products found.</CommandEmpty>

          {/* Group by Unique Product Names */}
          <CommandGroup heading="Product Names">
            {!isLoading &&
              getUniqueValues(data?.Products ?? [], "name").map((name) => (
                <CommandItem
                  key={name}
                  onSelect={() => {
                    setSearchTerm(name);
                    handleSearchSubmit(); // Navigate to /product?q=name
                  }}
                >
                  <span className="font-semibold">{name}</span>
                </CommandItem>
              ))}
          </CommandGroup>

          {/* Group by Unique Categories */}
          <CommandGroup heading="Categories">
            {!isLoading &&
              getUniqueValues(data?.Products ?? [], "category").map(
                (category) => (
                  <CommandItem
                    key={category}
                    onSelect={() => {
                      setSearchTerm(category);
                      handleSearchSubmit(); // Navigate to /product?q=category
                    }}
                  >
                    <span className="font-semibold">{category}</span>
                  </CommandItem>
                )
              )}
          </CommandGroup>

          {/* Group by Unique SubCategories */}
          <CommandGroup heading="SubCategories">
            {!isLoading &&
              getUniqueValues(data?.Products ?? [], "subCategory").map(
                (subCategory) => (
                  <CommandItem
                    key={subCategory}
                    onSelect={() => {
                      setSearchTerm(subCategory);
                      handleSearchSubmit(); // Navigate to /product?q=subCategory
                    }}
                  >
                    <span className="font-semibold">{subCategory}</span>
                  </CommandItem>
                )
              )}
          </CommandGroup>

          {/* Group by Unique Colors from Variants */}
          <CommandGroup heading="Colors">
            {!isLoading &&
              getUniqueColors(data?.Products ?? []).map((color) => (
                <CommandItem
                  key={color}
                  onSelect={() => {
                    setSearchTerm(color);
                    handleSearchSubmit(); // Navigate to /product?q=color
                  }}
                >
                  <span className="font-semibold">{color}</span>
                </CommandItem>
              ))}
          </CommandGroup>

          {/* Group by Unique Tags */}
          <CommandGroup heading="Tags">
            {!isLoading &&
              getUniqueTags(data?.Products ?? []).map((tag) => (
                <CommandItem
                  key={tag}
                  onSelect={() => {
                    setSearchTerm(tag);
                    handleSearchSubmit(); // Navigate to /product?q=tag
                  }}
                >
                  <span className="font-semibold">{tag}</span>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
