import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    original_total: 0,
    final_total: 0,
};

export const cartSlice = createSlice({
    name: "cart",

    initialState,

    reducers: {
        // Add product to cart
          addToCart: (state, { payload }) => {
        const product = state.items.find(
            (item) => item._id === payload._id
        );

        if (product) {
            product.qty += 1;
        } else {
            state.items.push({
                ...payload,
                qty: payload.qty || 1,
            });
        }

        state.original_total += Number(payload.price) || 0;
        state.final_total += Number(payload.salePrice) || 0;

        localStorage.setItem("cart", JSON.stringify(state));
    },

        // Increase product quantity
        increaseQty: (state, { payload }) => {
            const product = state.items.find(
                (item) => item._id === payload
            );

            if (!product) return;

            product.qty += 1;

            state.original_total += Number(product.price) || 0;
            state.final_total += Number(product.salePrice) || 0;

            localStorage.setItem("cart", JSON.stringify(state));
        },

        // Decrease product quantity
        decreaseQty: (state, { payload }) => {
            const product = state.items.find(
                (item) => item._id === payload
            );

            if (!product) return;

            if (product.qty > 1) {
                product.qty -= 1;

                state.original_total -= Number(product.price) || 0;
                state.final_total -= Number(product.salePrice) || 0;
            }

            localStorage.setItem("cart", JSON.stringify(state));
        },

        // Remove complete product from cart
        removeFromCart: (state, { payload }) => {
            const product = state.items.find(
                (item) => item._id === payload
            );

            if (!product) return;

            state.original_total -=
                (Number(product.price) || 0) * product.qty;

            state.final_total -=
                (Number(product.salePrice) || 0) * product.qty;

            state.items = state.items.filter(
                (item) => item._id !== payload
            );

            localStorage.setItem("cart", JSON.stringify(state));
        },

        // Update quantity directly
        updateQty: (state, { payload }) => {
            const { id, qty } = payload;

            const product = state.items.find(
                (item) => item._id === id
            );

            if (!product || qty < 1) return;

            // Remove old quantity amount
            state.original_total -=
                (Number(product.price) || 0) * product.qty;

            state.final_total -=
                (Number(product.salePrice) || 0) * product.qty;

            // Update quantity
            product.qty = qty;

            // Add new quantity amount
            state.original_total +=
                (Number(product.price) || 0) * product.qty;

            state.final_total +=
                (Number(product.salePrice) || 0) * product.qty;

            localStorage.setItem("cart", JSON.stringify(state));
        },

        // Load cart from localStorage
        lsToCart: (state) => {
            const lscart = JSON.parse(
                localStorage.getItem("cart")
            );

            if (lscart) {
                state.items = lscart.items || [];
                state.original_total = lscart.original_total || 0;
                state.final_total = lscart.final_total || 0;
            }
        },

        // Empty entire cart
        emptyCart: (state) => {
            state.items = [];
            state.original_total = 0;
            state.final_total = 0;

            localStorage.removeItem("cart");
        },
    },
});

export const {
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    updateQty,
    lsToCart,
    emptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;