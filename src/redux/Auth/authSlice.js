import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("collabUser"));

const initialState = {
    user: user ? user : null
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem('collabUser', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.user = null
            localStorage.removeItem('collabUser')
        }
    }
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer