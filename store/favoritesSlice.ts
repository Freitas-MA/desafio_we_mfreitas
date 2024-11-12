import type { MinimalRestaurant } from '@/types/restaurant';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  favorites: MinimalRestaurant[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<MinimalRestaurant>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(restaurant => restaurant._id !== action.payload);
    },
  },
});
export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;