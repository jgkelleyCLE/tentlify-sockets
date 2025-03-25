import { createSlice } from '@reduxjs/toolkit';

const theme = JSON.parse(localStorage.getItem('mapTheme'));
const tailTheme = JSON.parse(localStorage.getItem('tailTheme'));

const initialState = {
  theme: theme ? theme: 'mapbox://styles/jackiewebdev/cls0kadxz01hv01qo0lq26plu',
  
  tailTheme: tailTheme ? tailTheme : 'light',
};

const mapSlice = createSlice({
  name: 'mapSlice',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('mapTheme', JSON.stringify(action.payload));
    },
    setTailTheme: (state, action) => {
      state.tailTheme = action.payload;
      localStorage.setItem('tailTheme', JSON.stringify(action.payload));
    },
  },
});

export const { setTheme, setTailTheme } = mapSlice.actions;
export default mapSlice.reducer;