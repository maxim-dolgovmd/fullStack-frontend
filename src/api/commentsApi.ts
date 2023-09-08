import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const BASE_URL = 'http://localhost:4444'

interface CommentsType {
  value: string,
  id: string
}

interface UserType {
  avatarUrl: string,
  createdAt: string,
  email: string,
  fullName: string,
  passwordHash: string,
  updatedAt: string,
  _id: string,
}

interface GetCommentsType {
  createdAt: string,
  text: string,
  paramsId?: string,
  updatedAt: string,
  _id: string,
  user: UserType
}

export const commentsApi = createApi({
  reducerPath: 'comments',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  endpoints: (builder) => ({
    createComments: builder.mutation<null, CommentsType>({
      query: ({value, id}) => {
        console.log(value)
        return {
            url: `/comments`,
            method: 'POST',
            body: {
                text: value,
                paramsId: id
            },
            headers: {
                Authorization: window.localStorage.getItem('token') as any
            }
        }
      }
    }),

    getAllComments: builder.query<GetCommentsType, void>({
        query: () => {
            return {
                url: '/comments',
                method: 'GET',
            }
        }
    }),

    getOneComments: builder.query<any, any>({
        query: ({id}) => {
            console.log(id)
            return {
                url: `/comments/${id}`,
                method: 'GET',
            }
        }
    }),

  })
})


export const { useCreateCommentsMutation, useGetAllCommentsQuery, useGetOneCommentsQuery } = commentsApi