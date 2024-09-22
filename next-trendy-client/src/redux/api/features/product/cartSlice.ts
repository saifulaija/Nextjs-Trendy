import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

type CartItem = {
  _id: string;
  name: string;
  price: number;
  cartQuantity: number;
  discount?: number;
  size?: string;
  color?: string;
  image?: string;
};

// Cart state interface
interface CartState {
  cartItems: CartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
  selectedSize: string;
  selectedColor: string;
}

// Initial state
const initialState: CartState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") as string)
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  selectedSize: "",
  selectedColor: "",
};

// Redux slice for the cart
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingIndex = state.cartItems.findIndex(
        (item) =>
          item._id === action.payload._id && item.color === action.payload.color
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex].cartQuantity += 1;
        toast.info("Increased product quantity", { position: "bottom-left" });
      } else {
        const tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart", { position: "bottom-left" });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      cartSlice.caseReducers.getTotals(state);
    },

    decreaseCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) =>
          item._id === action.payload._id && item.color === action.payload.color
      );

      if (itemIndex >= 0 && state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info("Decreased product quantity", { position: "bottom-left" });
      } else if (
        itemIndex >= 0 &&
        state.cartItems[itemIndex].cartQuantity === 1
      ) {
        state.cartItems = state.cartItems.filter(
          (item) =>
            item._id !== action.payload._id ||
            item.color !== action.payload.color
        );
        toast.error("Product removed from cart", { position: "bottom-left" });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      cartSlice.caseReducers.getTotals(state);
    },

    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      state.cartItems = state.cartItems.filter(
        (item) =>
          item._id !== action.payload._id || item.color !== action.payload.color
      );
      toast.error("Product removed from cart", { position: "bottom-left" });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      cartSlice.caseReducers.getTotals(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart cleared", { position: "bottom-left" });
      cartSlice.caseReducers.getTotals(state);
    },

    getTotals: (state) => {
      const { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const discountedPrice = Math.round(
            cartItem.price - (cartItem.price * (cartItem.discount || 0)) / 100
          );
          const itemTotal = discountedPrice * cartItem.cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartItem.cartQuantity;
          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total; // Shipping charge removed from total
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, clearCart, getTotals } =
  cartSlice.actions;

export default cartSlice.reducer;



// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

// type CartItem = {
//   _id: string;
//   name: string;
//   price: number;
//   cartQuantity: number;
//   discount?: number;
//   size?: string;
//   color?: string;
//   image?: string;
// };

// // Cart state interface
// interface CartState {
//   cartItems: CartItem[];
//   cartTotalQuantity: number;
//   cartTotalAmount: number;
//   shippingCharge: number;
//   selectedSize: string;
//   selectedColor: string;
// }

// // Initial state
// const initialState: CartState = {
//   cartItems: localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems") as string)
//     : [],
//   cartTotalQuantity: 0,
//   cartTotalAmount: 0,
//   shippingCharge: 0, // Shipping charge initialized to 0
//   selectedSize: "",
//   selectedColor: "",
// };

// // Redux slice for the cart
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<CartItem>) => {
//       const existingIndex = state.cartItems.findIndex(
//         (item) =>
//           item._id === action.payload._id && item.color === action.payload.color
//       );

//       if (existingIndex >= 0) {
//         state.cartItems[existingIndex].cartQuantity += 1;
//         toast.info("Increased product quantity", { position: "bottom-left" });
//       } else {
//         const tempProductItem = { ...action.payload, cartQuantity: 1 };
//         state.cartItems.push(tempProductItem);
//         toast.success("Product added to cart", { position: "bottom-left" });
//       }

//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//       cartSlice.caseReducers.getTotals(state);
//     },

//     decreaseCart: (state, action: PayloadAction<CartItem>) => {
//       const itemIndex = state.cartItems.findIndex(
//         (item) =>
//           item._id === action.payload._id && item.color === action.payload.color
//       );

//       if (itemIndex >= 0 && state.cartItems[itemIndex].cartQuantity > 1) {
//         state.cartItems[itemIndex].cartQuantity -= 1;
//         toast.info("Decreased product quantity", { position: "bottom-left" });
//       } else if (
//         itemIndex >= 0 &&
//         state.cartItems[itemIndex].cartQuantity === 1
//       ) {
//         state.cartItems = state.cartItems.filter(
//           (item) =>
//             item._id !== action.payload._id ||
//             item.color !== action.payload.color
//         );
//         toast.error("Product removed from cart", { position: "bottom-left" });
//       }

//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//       cartSlice.caseReducers.getTotals(state);
//     },

//     removeFromCart: (state, action: PayloadAction<CartItem>) => {
//       state.cartItems = state.cartItems.filter(
//         (item) =>
//           item._id !== action.payload._id || item.color !== action.payload.color
//       );
//       toast.error("Product removed from cart", { position: "bottom-left" });
//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//       cartSlice.caseReducers.getTotals(state);
//     },

//     clearCart: (state) => {
//       state.cartItems = [];
//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//       toast.error("Cart cleared", { position: "bottom-left" });
//       cartSlice.caseReducers.getTotals(state);
//     },

//     // New reducer to set the shipping charge
//     setShippingCharge: (state, action: PayloadAction<number>) => {
//       state.shippingCharge = action.payload;
//       cartSlice.caseReducers.getTotals(state); // Recalculate totals when shipping changes
//     },

//     getTotals: (state) => {
//       const { total, quantity } = state.cartItems.reduce(
//         (cartTotal, cartItem) => {
//           const discountedPrice = Math.round(
//             cartItem.price - (cartItem.price * (cartItem.discount || 0)) / 100
//           );
//           const itemTotal = discountedPrice * cartItem.cartQuantity;
//           cartTotal.total += itemTotal;
//           cartTotal.quantity += cartItem.cartQuantity;
//           return cartTotal;
//         },
//         { total: 0, quantity: 0 }
//       );

//       state.cartTotalQuantity = quantity;
//       state.cartTotalAmount = total + state.shippingCharge; // Include shipping in total
//     },
//   },
// });

// export const {
//   addToCart,
//   decreaseCart,
//   removeFromCart,
//   clearCart,
//   setShippingCharge,
//   getTotals,
// } = cartSlice.actions;

// export default cartSlice.reducer;
