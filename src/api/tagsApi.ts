import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const BASE_URL = 'http://localhost:4444'

type UserType = {
  avatarUrl: string,
  createdAt: string,
  email: string,
  fullName: string,
  passwordHash: string,
  updatedAt: string,
  _id: string,
}

interface TagsDataType {
  createdAt: string,
  updatedAt: string,
  tags?: string[],
  text: string
  _id: string,
  title: string,
  user: UserType,
  viewsCount: number,
  imageUrl?: string
}

export const tagsApi = createApi({
  reducerPath: 'tags',
  baseQuery: fetchBaseQuery(
    {baseUrl: BASE_URL}
  ),
  endpoints: (builder) => ({
    findTags: builder.query<any, any>({
      query: ({id}) => {
        console.log(id)
        return {
            url: `/tags/${id}`,
            method: 'GET',
        }
      }
    }),

  })
})


export const { useFindTagsQuery } = tagsApi