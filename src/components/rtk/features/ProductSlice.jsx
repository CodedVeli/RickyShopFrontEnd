import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: [],
  status: null,
  error: null,
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id=null, { rejectWithValue}) => {
    try{
    const response = await axios.get("https://fakestoreapi.com/products/"+id);
    return response.data;
    }
    catch (error) {
        return rejectWithValue(error.message);
    }
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const productReducer = ProductSlice.reducer;
