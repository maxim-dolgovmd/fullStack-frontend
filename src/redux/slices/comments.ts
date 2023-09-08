import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { RootState } from '../store'
import { addCommentsCount } from '../../utils/addCommentsCount'
import { returnCommentsCount } from '../../utils/returnCommentsCount'

interface UserType {
    avatarUrl: string,
    createdAt: string,
    email: string,
    fullName: string,
    passwordHash: string,
    updatedAt: string,
    _id: string,
  }
  
type ItemsType = {
    count: any
    createdAt: string,
    tags: string[],
    text: string,
    title: string,
    updatedAt: string,
    _id: string,
    user: UserType,
    viewsCount: number
}

interface InitialType {
    commentsNew: boolean,
    commentsQuantity: ItemsType[]
}

const returnCount = returnCommentsCount()


const initialState: InitialType = {
    commentsNew: false,
    commentsQuantity: []
}

console.log(returnCount, initialState.commentsQuantity)

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setNewComments(state, action: PayloadAction<boolean>) {
            state.commentsNew = action.payload
        },

        setCommentsQuantity(state, action: PayloadAction<ItemsType>) {

            const commentItem = state.commentsQuantity?.find((obj) => obj._id === action.payload._id)

            if (commentItem) {
                commentItem.count++
            }

            if (!commentItem) {
                state.commentsQuantity?.push({
                    ...action.payload,
                    count: 1
                })
            }
        }
    }
})

export const commentsType = (state: RootState) => state.commentsSlice

export const { setNewComments, setCommentsQuantity } = commentsSlice.actions

export default commentsSlice.reducer