import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loadCreated: false
}

const loadSlice = createSlice({
    name: 'loadSlice',
    initialState,
    reducers: {
        setLoadCreated: (state, action) => {
            state.loadCreated = action.payload
        }
    }
})

export const { setLoadCreated } = loadSlice.actions
export default loadSlice.reducer