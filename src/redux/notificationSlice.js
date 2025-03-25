import { createSlice } from "@reduxjs/toolkit";

const inviteNotifications = JSON.parse(localStorage.getItem('tentlifyNotifications'))

const initialState = {
    notifications: inviteNotifications ? inviteNotifications : []
}

const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.notifications.push(action.payload)
            localStorage.setItem('tentlifyNotifications', JSON.stringify(state.notifications))
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(notification => notification.id !== action.payload)
            localStorage.setItem('tentlifyNotifications', JSON.stringify(state.notifications))
        },
        clearAllNotifications: (state) => {
            state.notifications = []
            localStorage.removeItem('tentlifyNotifications')
            // localStorage.setItem('tentlifyNotifications', JSON.stringify(state.notifications))
        }
    }
})


export const { addNotification, removeNotification, clearAllNotifications } = notificationSlice.actions
export default notificationSlice.reducer