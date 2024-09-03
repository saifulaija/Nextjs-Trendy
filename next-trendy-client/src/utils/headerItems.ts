import { USER_ROLE } from "@/constants/role";
import { IHeaderItem, UserRole } from "@/types";

export const headerItems = (role: UserRole): IHeaderItem[] => {
  const roleMenus: IHeaderItem[] = [];
  // const defaultMenus = [
  //   { title: "Profile", path: `${role}/profile` },
  //   // { title: "Change Password", path: `change-password` },
  // ];

  switch (role) {

    case USER_ROLE.ADMIN:
      roleMenus.push(
        { title: "Dashboard", path: `${role}` },
        { title: "Bloggers", path: `${role}/bloggers` },
        { title: "Moderator", path: `${role}/moderators` },
        { title: "Blogs", path: `${role}/blogs` }
      );
      break;
   
    case USER_ROLE.USER:
      roleMenus.push(
        { title: "Dashboard", path: `${role}` },
        { title: "Show Blogs", path: `${role}/show-blogs` }
      );
      break;
    default:
      break;
  }

  return [...roleMenus];
};
