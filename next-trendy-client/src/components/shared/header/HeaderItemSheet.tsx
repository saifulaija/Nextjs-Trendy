// import * as React from "react";
// import { cn } from "@/lib/utils";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";
// import { items } from "@/utils/items";

// export function HeaderItemSheet() {
//   return (
//     <NavigationMenu orientation="vertical" className="w-full">
//       <NavigationMenuList className="flex flex-col">
//         {items.map((item) => (
//           <NavigationMenuItem
//             key={item.key}
//             className="relative flex flex-col gap-3 group"
//           >
//             <NavigationMenuTrigger className="rounded-none capitalize w-full pl-2 py-2 text-left hover:bg-gray-100">
//               {item.label}
//             </NavigationMenuTrigger>
//             {item.children && item.children.length > 0 && (
//               <div
//                 className={cn(
//                   "absolute left-full top-0 ml-2 bg-white shadow-lg border border-gray-200 rounded-md z-10 opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-300 ease-in-out"
//                 )}
//               >
//                 <NavigationMenuContent>
//                   <ul className="grid gap-2 p-3 w-60">
//                     {item.children.map((child) => (
//                       <ListItem
//                         key={child.key}
//                         href={`/products/${child.key}`}
//                         title={child.label}
//                       />
//                     ))}
//                   </ul>
//                 </NavigationMenuContent>
//               </div>
//             )}
//           </NavigationMenuItem>
//         ))}
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// }

// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, ...props }, ref) => {
//   return (
//     <li className="flex items-center">
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent focus:text-accent-foreground",
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   );
// });
// ListItem.displayName = "ListItem";



import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { items } from "@/utils/items";

export function HeaderItemSheet() {
  return (
    <NavigationMenu orientation="vertical" className="w-full">
      <NavigationMenuList className="flex-col items-start space-x-0">
        {items.map((item) => (
          <NavigationMenuItem
            key={item.key}
            className="relative flex flex-col gap-3 group"
          >
            <NavigationMenuTrigger className="rounded-none capitalize w-60 pl-1 flex justify-between">
              {item.label}
            </NavigationMenuTrigger>
            {item.children && item.children.length > 0 && (
              <NavigationMenuContent
                className={cn(
                  "absolute top-0 left-full ml-2 bg-white shadow-lg border border-gray-200 rounded-md z-10 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 ease-in-out"
                )}
              >
                <ul className="grid gap-2 p-3 w-60">
                  {item.children.map((child) => (
                    <ListItem
                      key={child.key}
                      href={`/products/${child.key}`}
                      title={child.label}
                    />
                  ))}
                </ul>
              </NavigationMenuContent>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
  return (
    <li className="flex items-center">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-white focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";


