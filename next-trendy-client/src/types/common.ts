import { USER_ROLE } from "@/constants/role";

export type IMeta = {
  page: number;
  limit: number;
  total: number;
};

export type UserRole = keyof typeof USER_ROLE;

export interface IHeaderItem {
  title: string;
  path?: string;
  subMenu?: IHeaderItem[];
}
export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export const Category = ["men", "women", "kids", "accessories"];
export const SubCategory = [
  "men-formal",
  "men-sandal",
  "men-casual",
  "men-sport",
  "men-boot",
  "men-loafer",
  "women-hell",
  "women-flat",
  "women-casual",
  "women-sandal",
  "women-sport",
  "women-formal",
  "kids-sandal",
  "kids-sneaker",
  "kids-sport",
  "men-accessories",
  "women-accessories",
];
export const ApproveStatus = ["APPROVED", "CANCEL"];
export const BlogCategory = [
  "programming",
  "technologies",
  "devops",
  "travels",
  "foods",
  "lifestyles",
  "fashions",
  "fitness",
  "educations",
];

export const Tags = [
  "programming",
  "technology",
  "travel",
  "food",
  "lifestyle",
  "fashion",
  "fitness",
  "health",
  "business",
  "finance",
  "science",
  "education",
  "entertainment",
  "music",
  "sports",
  "art",
  "python",
  "sql",
  "nosql",
  "writing",
  "gaming",
  "diy",
  "parenting",
  "react",
  "frontend",
  "css",
  "javascript",
  "typescript",
  "database",
  "backend",
  "tools",
  "productivity",
  "psychology",
  "socialmedia",
  "startups",
  "machine-learning",
  "webdevelopment",
  "datascience",
  "javascript",
  "typescript",
  "algorithm",
  "dev",
  "ai",
];
