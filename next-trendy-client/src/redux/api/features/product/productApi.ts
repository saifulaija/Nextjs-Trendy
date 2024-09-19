import { IMeta } from "@/types";

import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { TProduct } from "@/types/product.type";

const ProductsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (data) => ({
        url: "/product/create-product",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        data,
      }),
      invalidatesTags: [tagTypes.product],
    }),

    getAllProducts: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/product",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: TProduct[], meta: IMeta) => {
        return {
          Products: response,
          meta,
        };
      },
      providesTags: [tagTypes.product],
    }),
    getAllProductsVariant: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/product/variant",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: TProduct[], meta: IMeta) => {
        return {
          Products: response,
          meta,
        };
      },
      providesTags: [tagTypes.product],
    }),
    getMyProducts: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/product/get-my-Products`,
        method: "GET",
        params: arg,
      }),
      // transformResponse: (response: IProduct[], meta: IMeta) => {
      //   return {
      //     Products: response,
      //     meta,
      //   };
      // },
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
        url: `/product/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product,tagTypes.variant],
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
        url: `/product/update-product/${data.id}`,
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
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetMyProductsQuery,
  useGetSingleProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetSingleProductForModeratorQuery,
  useUpdateStatusApproveMutation,
  useGetAllProductsVariantQuery
} = ProductsApi;
