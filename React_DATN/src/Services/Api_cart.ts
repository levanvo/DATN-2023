import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cart } from "../Models/interfaces";
import { pause } from "../utils/pause";

const cartApi = createApi({
    reducerPath: "cart",
    tagTypes: ["Cart"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080",
        prepareHeaders: (headers) => {
            headers.set("Content-type", "appliation/json"),
                headers.set("authorization", "Bearer " + JSON.parse(localStorage.getItem("token") || ""))
            return headers;
        },
        fetchFn: async (...args) => (
            await pause(1000),
            fetch(...args)
        )
    }),
    endpoints: (builder) => ({
        getCart: builder.query<any,void>({
            query: () => "/api/cart",
            providesTags: ["Cart"]
        }),

        addToCart: builder.mutation<Cart,Cart>({
            query: (product) => ({
                url: "/api/cart",
                method: "POST",
                body: product
            }),
            invalidatesTags: ["Cart"]

        }),

        deleteFromCart: builder.mutation<void, string>({
            query: (productId) => ({
                url: `/api/cart/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"]

        }),
    }),
});

export const { useGetCartQuery, useAddToCartMutation, useDeleteFromCartMutation } = cartApi;
export default cartApi;