import { IMeta } from "@/types";

import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { TProduct } from "@/types/product.type";

const ReviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createReview: build.mutation({
      query: (data) => {
        return {
          url: `/product/${data.id}/review`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: data.body,
        };
      },
      invalidatesTags: [tagTypes.review, tagTypes.product], // Invalidate related tags
    }),

    getAllReview: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/product",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: TProduct[], meta: IMeta) => {
        return {
          Review: response,
          meta,
        };
      },
      providesTags: [tagTypes.product],
    }),
    getAllReviewVariant: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/product/variant",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: TProduct[], meta: IMeta) => {
        return {
          Review: response,
          meta,
        };
      },
      providesTags: [tagTypes.product],
    }),
    getMyReview: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/product/get-my-Review`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.product],
    }),
    getSingleProduct: build.query({
      query: (id) => ({
        url: `/product/get-single-product/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.product],
    }),
    getSingleProductForModerator: build.query({
      query: (id) => ({
        url: `/product/get-single-product/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.product],
    }),

    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/product/soft-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product],
    }),
    // getSingleDoctor: build.query({
    //   query: (id: string | string[] | undefined) => ({
    //     url: `/doctor/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.doctor],
    // }),
    updateProduct: build.mutation({
      query: (data) => ({
        url: `/product/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    updateStatusApprove: build.mutation({
      query: (data) => ({
        url: `/product/change-approval-status/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.product],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetAllReviewQuery,
  useGetMyReviewQuery,
  useGetSingleProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetSingleProductForModeratorQuery,
  useUpdateStatusApproveMutation,
  useGetAllReviewVariantQuery,
} = ReviewApi;
