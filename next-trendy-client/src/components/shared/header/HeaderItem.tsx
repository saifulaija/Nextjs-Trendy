// "use client";
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
// import { accessories, kids, men, women } from "@/utils/items";
// import { usePathname } from "next/navigation";

// export function HeaderItems() {
//   const pathname = usePathname();
//   return (
//     <NavigationMenu>
//       <NavigationMenuList>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger
//             className={cn(
//               "font-semibold hover:bg-white text-gray-500 bg-none hover:text-primary"
//             )}
//           >
//             MAN'S
//           </NavigationMenuTrigger>

//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
//               {men.map((item) => (
//                 <ListItem
//                   key={item.label}
//                   title={item.label}
//                   href={item.href}
//                   className={cn(
//                     "relative group hover:text-white transition-all duration-500 hover:bg-primary"
//                   )}
//                 >
//                   <span className="group-hover:text-white transition-colors duration-300">
//                     {item.description}
//                   </span>
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger
//             className={cn(
//               "font-semibold hover:bg-white text-gray-500 bg-none hover:text-primary"
//             )}
//           >
//             WOMEN'S
//           </NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
//               {women.map((item) => (
//                 <ListItem
//                   key={item.label}
//                   title={item.label}
//                   href={item.href}
//                   className={cn(
//                     "relative group hover:text-white transition-all duration-500 hover:bg-primary"
//                   )}
//                 >
//                   <span className="group-hover:text-white transition-colors duration-300">
//                     {item.description}
//                   </span>
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger
//             className={cn(
//               "font-semibold hover:bg-white text-gray-500 bg-none hover:text-primary"
//             )}
//           >
//             KId'S
//           </NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
//               {kids.map((item) => (
//                 <ListItem
//                   key={item.label}
//                   title={item.label}
//                   href={item.href}
//                   className={cn(
//                     "relative group hover:text-white transition-all duration-500 hover:bg-primary"
//                   )}
//                 >
//                   <span className="group-hover:text-white transition-colors duration-300">
//                     {" "}
//                     {item.description}
//                   </span>
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem></NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger
//             className={cn(
//               "font-semibold hover:bg-white text-gray-500 bg-none hover:text-primary"
//             )}
//           >
//             ACCESSORIES
//           </NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2  lg:w-[600px] ">
//               {accessories.map((item) => (
//                 <ListItem
//                   key={item.label}
//                   title={item.label}
//                   href={item.href}
//                   className={cn(
//                     "relative group hover:text-white transition-all duration-500 hover:bg-primary"
//                   )}
//                 >
//                   <span className="group-hover:text-white transition-colors duration-300">
//                     {" "}
//                     {item.description}
//                   </span>
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// }

// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   );
// });
// ListItem.displayName = "ListItem";

// // import * as React from "react";
// // import { cn } from "@/lib/utils";
// // import {
// //   NavigationMenu,
// //   NavigationMenuContent,
// //   NavigationMenuItem,
// //   NavigationMenuLink,
// //   NavigationMenuList,
// //   NavigationMenuTrigger,
// // } from "@/components/ui/navigation-menu";
// // import { items } from "@/utils/items";

// // export function HeaderItems() {
// //   return (
// //     <NavigationMenu orientation="vertical">
// //       <NavigationMenuList>
// //         {items.map((item) => (
// //           <NavigationMenuItem key={item.key}>
// //             <NavigationMenuTrigger className="font-semibold text-gray-600">
// //               {item.label}
// //             </NavigationMenuTrigger>
// //             <NavigationMenuContent>
// //               <ul className="grid gap-0 p-2 md:w-[300px] lg:w-[300px]">
// //                 {item.children.map((child) => (
// //                   <ListItem
// //                     key={child.key}
// //                     href={`/products/${child.key}`}
// //                     title={child.label}
// //                   />
// //                 ))}
// //               </ul>
// //             </NavigationMenuContent>
// //           </NavigationMenuItem>
// //         ))}
// //       </NavigationMenuList>
// //     </NavigationMenu>
// //   );
// // }

// // const ListItem = React.forwardRef<
// //   React.ElementRef<"a">,
// //   React.ComponentPropsWithoutRef<"a">
// // >(({ className, title, ...props }, ref) => {
// //   return (
// //     <li>
// //       <NavigationMenuLink asChild>
// //         <a
// //           ref={ref}
// //           className={cn(
// //             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary  hover:text-white focus:bg-accent focus:text-accent-foreground",
// //             className
// //           )}
// //           {...props}
// //         >
// //           <div className="text-sm font-medium leading-none">{title}</div>
// //         </a>
// //       </NavigationMenuLink>
// //     </li>
// //   );
// // });
// // ListItem.displayName = "ListItem";



"use client";
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
import { accessories, kids, men, women } from "@/utils/items";
import { usePathname } from "next/navigation";

export function HeaderItems() {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              "font-semibold hover:bg-white text-gray-500 bg-none",
              pathname.startsWith("/product/category/men") && "text-primary"
            )}
          >
            MAN'S
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {men.map((item) => (
                <ListItem
                  key={item.label}
                  title={item.label}
                  href={item.href}
                  className={cn(
                    "relative group hover:text-white transition-all duration-500 hover:bg-primary",
                    pathname === item.href && "text-primary"
                  )}
                >
                  <span className="group-hover:text-white transition-colors duration-300">
                    {item.description}
                  </span>
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              "font-semibold hover:bg-white text-gray-500 bg-none",
              pathname.startsWith("/product/category/women") && "text-primary"
            )}
          >
            WOMEN'S
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {women.map((item) => (
                <ListItem
                  key={item.label}
                  title={item.label}
                  href={item.href}
                  className={cn(
                    "relative group hover:text-white transition-all duration-500 hover:bg-primary",
                    pathname === item.href && "text-primary"
                  )}
                >
                  <span className="group-hover:text-white transition-colors duration-300">
                    {item.description}
                  </span>
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              "font-semibold hover:bg-white text-gray-500 bg-none",
              pathname.startsWith("/product/category/kids") && "text-primary"
            )}
          >
            KID'S
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {kids.map((item) => (
                <ListItem
                  key={item.label}
                  title={item.label}
                  href={item.href}
                  className={cn(
                    "relative group hover:text-white transition-all duration-500 hover:bg-primary",
                    pathname === item.href && "text-primary"
                  )}
                >
                  <span className="group-hover:text-white transition-colors duration-300">
                    {item.description}
                  </span>
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              "font-semibold hover:bg-white text-gray-500 bg-none",
              pathname.startsWith("/product/category/accessories") &&
                "text-primary"
            )}
          >
            ACCESSORIES
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {accessories.map((item) => (
                <ListItem
                  key={item.label}
                  title={item.label}
                  href={item.href}
                  className={cn(
                    "relative group hover:text-white transition-all duration-500 hover:bg-primary",
                    pathname === item.href && "text-primary"
                  )}
                >
                  <span className="group-hover:text-white transition-colors duration-300">
                    {item.description}
                  </span>
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
