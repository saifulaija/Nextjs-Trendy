import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TInitial = {
  shippingCost: number;
};

const initialState: TInitial = {
  shippingCost: 0,
};

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    addShippingCost: (state, action: PayloadAction<number>) => {
      state.shippingCost = action.payload;
    },
    clearShippingCost: (state) => {
      state.shippingCost = 0;
    },
  },
});

export const { addShippingCost, clearShippingCost } = shippingSlice.actions;

export default shippingSlice.reducer;


