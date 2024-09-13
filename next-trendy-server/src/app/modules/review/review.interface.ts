import { Types } from "mongoose";

export type TReview={
    name:string;
    email:string;
    rating:number;
    comment:string;
    productId:Types.ObjectId;
    isDeleted?:boolean
}