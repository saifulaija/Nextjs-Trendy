import { IMeta } from "@/types";

import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";


const variantsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createVariant: build.mutation({
      query: (data) => ({
        url: "/variant/create-variant",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        data,
      }),
      invalidatesTags: [tagTypes.variant],
    }),

    getAllVariants: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/variant",
        method: "GET",
        params: arg,
      }),
   
      providesTags: [tagTypes.variant],
    }),
   
    getMyVariants: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/variant/get-my-Variants`,
        method: "GET",
        params: arg,
      }),
      // transformResponse: (response: IVariant[], meta: IMeta) => {
      //   return {
      //     Variants: response,
      //     meta,
      //   };
      // },
      providesTags: [tagTypes.variant],
    }),
    getSingleVariant: build.query({
      query: (id) => ({
        url: `/variant/get-single-variant/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.variant],
    }),
    getSingleVariantForModerator: build.query({
      query: (id) => ({
        url: `/variant/get-single-variant/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.variant],
    }),

    deleteVariant: build.mutation({
      query: (id) => ({
        url: `/variant/soft-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.variant],
    }),
    // getSingleDoctor: build.query({
    //   query: (id: string | string[] | undefined) => ({
    //     url: `/doctor/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.doctor],
    // }),
    updateVariant: build.mutation({
      query: (data) => ({
        url: `/variant/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.variant],
    }),
    updateStatusApprove: build.mutation({
      query: (data) => ({
        url: `/variant/change-approval-status/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.variant],
    }),
  }),
});

export const {
  useCreateVariantMutation,
  useGetAllVariantsQuery,
  useGetMyVariantsQuery,
  useGetSingleVariantQuery,
  useDeleteVariantMutation,
  useUpdateVariantMutation,
  useGetSingleVariantForModeratorQuery,
  useUpdateStatusApproveMutation,
  
} = variantsApi;
