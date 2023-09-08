import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = {
    removePostsId: {}
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setRemovePostsId(state, action: PayloadAction<string>) {
            state.removePostsId = action.payload
        }
    }
})

export const removeId = (state: RootState) => state.postsSlice

export const { setRemovePostsId } = postsSlice.actions

export default postsSlice.reducer