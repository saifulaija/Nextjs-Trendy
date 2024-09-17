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

    getMyReview: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/product/get-my-Review`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.product],
    }),
    getAllReviews: build.query({
      query: (id) => ({
        url: `/product//${id}/review`,
        method: "GET",
      }),

      providesTags: [tagTypes.review],
    }),

    getAllPendingReviews: build.query({
      query: () => ({
        url: `/product/pending-reviews`,
        method: "GET",
      }),

      providesTags: [tagTypes.review],
    }),
    getAllApprovedReviews: build.query({
      query: () => ({
        url: `/product/approved-reviews`,
        method: "GET",
      }),

      providesTags: [tagTypes.review],
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

    updateProduct: build.mutation({
      query: (data) => ({
        url: `/product/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    updateReviewStatus: build.mutation({
      query: (data) => ({
        url: `/review/${data.id}`,
        method: "PUT",
        data: { status: data.status },
      }),
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetMyReviewQuery,
  useGetAllReviewsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetSingleProductForModeratorQuery,
useUpdateReviewStatusMutation,
  useGetAllPendingReviewsQuery,
  useGetAllApprovedReviewsQuery
} = ReviewApi;
