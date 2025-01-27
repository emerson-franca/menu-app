import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RestaurantData, MenuData } from "../../types";

interface RestaurantState {
  restaurantData: RestaurantData | null;
  menuData: MenuData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  menuStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  menuError: string | null;
}

const API_URL = process.env.REACT_APP_API_URL || "";

const fetchWithHeaders = async (url: string) => {
  const response = await fetch(`${API_URL}${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const fetchRestaurantData = createAsyncThunk<RestaurantData>(
  "restaurant/fetchRestaurantData",
  async () => {
    return fetchWithHeaders("/challenge/venue/9");
  }
);

export const fetchMenuData = createAsyncThunk<MenuData>(
  "restaurant/fetchMenuData",
  async () => {
    return fetchWithHeaders("/challenge/menu");
  }
);

const initialState: RestaurantState = {
  restaurantData: null,
  menuData: null,
  status: "idle",
  menuStatus: "idle",
  error: null,
  menuError: null,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRestaurantData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.restaurantData = action.payload;
      })
      .addCase(fetchRestaurantData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(fetchMenuData.pending, (state) => {
        state.menuStatus = "loading";
      })
      .addCase(fetchMenuData.fulfilled, (state, action) => {
        state.menuStatus = "succeeded";
        state.menuData = action.payload;
      })
      .addCase(fetchMenuData.rejected, (state, action) => {
        state.menuStatus = "failed";
        state.menuError = action.error.message ?? "Unknown error";
      });
  },
});

export default restaurantSlice.reducer;
