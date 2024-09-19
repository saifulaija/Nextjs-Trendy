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
      invalidatesTags: [tagTypes.variant,tagTypes.product],
    }),

    getAllVariants: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/variant",
        method: "GET",
        params: arg,
      }),

      providesTags: [tagTypes.variant],
    }),

    getSingleVariant: build.query({
      query: (id) => ({
        url: `/variant/get-single-variant/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.variant],
    }),

    deleteVariant: build.mutation({
      query: (id) => ({
        url: `/variant/delete-variant/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.variant, tagTypes.product],
    }),

    updateVariant: build.mutation({
      query: (data) => ({
        url: `/variant/update-variant/${data.id}`,
        method: "PUT",
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
  useGetSingleVariantQuery,
  useDeleteVariantMutation,
  useUpdateVariantMutation,
  useUpdateStatusApproveMutation,
} = variantsApi;
