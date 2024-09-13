// src/redux/slices/shoeSizeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShoeSizeState {
  selectedSize: string | null;
}

const initialState: ShoeSizeState = {
  selectedSize: null,
};

const shoeSizeSlice = createSlice({
  name: "shoeSize",
  initialState,
  reducers: {
    toggleSize: (state, action: PayloadAction<string>) => {
      // If the selected size is the same as the current, deselect it
      if (state.selectedSize === action.payload) {
        state.selectedSize = null;
      } else {
        // Otherwise, set the new size
        state.selectedSize = action.payload;
      }
    },
  },
});

// Export the actions
export const { toggleSize } = shoeSizeSlice.actions;

// Export the reducer
export default shoeSizeSlice.reducer;
