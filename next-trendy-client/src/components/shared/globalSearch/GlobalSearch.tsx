// "use client";

// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { Search } from "lucide-react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import React, { useState, useEffect, useCallback } from "react";
// import { Loader2 } from "lucide-react"; // Import a loader icon

// export default function GlobalSearch({ placeholder }: { placeholder: string }) {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const { replace, push } = useRouter();
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false); // Add loading state

//   const getIdFromPathname = (pathname: string) => {
//     const match = pathname.match(
//       /\/product-category\/(?:details|bookmarks\/details)\/(.+)/
//     );
//     return match ? match[1] : null;
//   };

//   const id = getIdFromPathname(pathname);
//   const disableSearch = !!id || pathname === "/blogs/tags";

//   // Function to handle navigation after a delay
//   const delayedNavigation = useCallback(
//     (term: string) => {
//       setLoading(true); // Start loading

//       const params = new URLSearchParams(searchParams);
//       if (term) {
//         params.set("searchTerm", term);
//       } else {
//         params.delete("searchTerm");
//       }

//       const timer = setTimeout(() => {
//         if (pathname === "/") {
//           push(`/product-category/mans/man-sport?${params.toString()}`);
//         } else {
//           replace(`${pathname}?${params.toString()}`);
//         }
//         setLoading(false); // End loading
//       }, 10000); // Delay for 10 seconds

//       return timer;
//     },
//     [searchParams, pathname, push, replace]
//   );

//   useEffect(() => {
//     // If there's a search term, start the delayed navigation
//     let timer: NodeJS.Timeout | undefined;
//     if (searchTerm && !disableSearch) {
//       timer = delayedNavigation(searchTerm);
//     }

//     // Clean up the timer if searchTerm changes or component unmounts
//     return () => {
//       if (timer) {
//         clearTimeout(timer);
//       }
//     };
//   }, [searchTerm, delayedNavigation, disableSearch]);

//   return (
//     <div className="w-full">
//       <div className="relative">
//         <Input
//           type="search"
//           onChange={(e) => {
//             const term = e.target.value;
//             setSearchTerm(term);
//             // Search term is updated here, and navigation will be handled by useEffect
//           }}
//           placeholder={placeholder}
//           className={cn(
//             "w-full appearance-none bg-background pl-8 shadow-none md:w-full lg:w-full rounded-lg"
//           )}
//           value={searchTerm}
//           disabled={disableSearch}
//         />
//         <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer">
//           {loading ? (
//             <Loader2 className="animate-spin" /> // Show loading spinner
//           ) : (
//             <Search />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react"; // Import a loader icon

export default function GlobalSearch({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const getIdFromPathname = (pathname: string) => {
    const match = pathname.match(
      /\/product-category\/(?:details|bookmarks\/details)\/(.+)/
    );
    return match ? match[1] : null;
  };

  const id = getIdFromPathname(pathname);
  const disableSearch = !!id || pathname === "/blogs/tags";

  const updateURL = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("searchTerm", term);
      } else {
        params.delete("searchTerm");
      }

      const newUrl = `${pathname}?${params.toString()}`;
      if (term) {
        push(newUrl); // Navigate with search term
      } else {
        replace(newUrl); // Replace URL if no search term
      }
    },
    [searchParams, pathname, push, replace]
  );

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (searchTerm && !disableSearch) {
      setLoading(true); // Start loading
      timer = setTimeout(() => {
        updateURL(searchTerm); // Navigate after delay
        setLoading(false); // End loading
      }, 10000); // Delay for 10 seconds
    } else if (!searchTerm) {
      // Clear searchTerm parameter from URL immediately
      setLoading(false); // End loading immediately
      updateURL(searchTerm); // Update URL to remove search term
    }

    // Clean up the timer if searchTerm changes or component unmounts
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchTerm, disableSearch, updateURL]);

  return (
    <div className="w-full">
      <div className="relative">
        <Input
          type="search"
          onChange={(e) => {
            const term = e.target.value;
            setSearchTerm(term);
          }}
          placeholder={placeholder}
          className={cn(
            "w-full appearance-none bg-background pl-8 shadow-none md:w-full lg:w-full rounded-lg"
          )}
          value={searchTerm}
          disabled={disableSearch}
        />
        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer">
          {loading ? (
            <Loader2 className="animate-spin" /> // Show loading spinner
          ) : (
            <Search />
          )}
        </div>
      </div>
    </div>
  );
}
