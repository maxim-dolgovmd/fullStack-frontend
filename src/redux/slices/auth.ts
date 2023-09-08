import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { RootState } from '../store'

interface AuthSliceType {
    _id: string,
    fullName: string,
    email: string,
    avatarUrl: string,
    createdAt: string,
    updatedAt: string
}

type initialType = {
    auth: any,
    authStatus: Boolean
}

const initialState: initialType = {
    auth: {},
    authStatus: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<any>) {
            state.auth = action.payload
        },

        setStatusAuth(state, action: PayloadAction<boolean>) {
            state.authStatus = action.payload
        }
    }
})

export const authMe = (state: RootState) => state.authSlice

export const { setAuth, setStatusAuth } = authSlice.actions

export default authSlice.reducer