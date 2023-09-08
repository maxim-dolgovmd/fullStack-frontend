import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

type RemoveType = {
  id: string
}

interface PostType {
  title: string,
  tags: string,
  value: string,
  imageUrl: string,
}

interface UpdateType {
  id: string,
  title: string,
  tags: string,
  value: string,
  imageUrl: string
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

type ItemsPostType = {
  createdAt: string,
  tags: string[],
  text: string,
  title: string,
  updatedAt: string,
  _id: string,
  user: UserType,
  viewsCount: number
}

const BASE_URL = 'http://localhost:4444'

export const postsApi = createApi({
  reducerPath: 'posts',
  baseQuery: fetchBaseQuery(
    {baseUrl: BASE_URL}
  ),
  endpoints: (builder) => ({
    getPost: builder.query<ItemsPostType[], number>({
      query: (sort) => {
        console.log(sort)
        if (sort === 1) {
          return {
            url: `/posts?sort=createdAt`,
            method: 'GET'
          }
        }
        if (sort === 2) {
          return {
            url: `/posts?sort=viewsCount`,
            method: 'GET'
          }
        }
        return {
          url: `/posts`,
          method: 'GET'
        }
      }
    }),

    getTags: builder.query<any, void>({
        query: () => {
            return {
                url: '/tags',
                method: 'GET'
            }
        }
    }),

    getOnePost: builder.query({
      query: ({id}) => {
        return {
          url: `/posts/${id}`,
          method: 'GET'
        }
      }
    }),

    onePost: builder.mutation({
      query: ({id}) => {
        return {
          url: `/posts/${id}`,
          method: 'GET'
        }
      }
    }),

    removePost: builder.mutation<null, RemoveType>({
      query: ({id}) => {
        console.log(id)
        return {
          url: `/posts/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: (window.localStorage.getItem('token') as any)
          }
        }
      }
    }),

    createPost: builder.mutation<null, PostType>({
      query: ({title, tags, value, imageUrl}) => {
        return {
          url: '/posts',
          method: 'POST',
          body: {
            title: title,
            tags: tags.replaceAll(' ', '').split(','),
            text: value,
            imageUrl: imageUrl,
          },
          headers: {
            Authorization: (window.localStorage.getItem('token') as any)
          }
        }
      }
    }),

    updatePost: builder.mutation<null, UpdateType>({
      query: ({id, title, tags, value, imageUrl}) => {
        return {
          url: `/posts/${id}`,
          method: 'PATCH',
          body: {
            title: title,
            tags: tags.replaceAll(' ', '').split(','),
            text: value,
            imageUrl: imageUrl
          },
          headers: {
            Authorization: (window.localStorage.getItem('token') as any)
          }
        }
      }
    }),

    updateCount: builder.mutation({
      query: ({id, article}) => {
        console.log(article.count)
        return {
          url: `/posts/${id}`,
          method: 'PATCH',
          body: {
            count: article.count + 1,
            title: article.title,
            text: article.text,
          },
          headers: {
            Authorization: (window.localStorage.getItem('token') as any)
          }
        }
      }
    })
  }),
})


export const { 
  useGetPostQuery, 
  useGetTagsQuery, 
  useGetOnePostQuery, 
  useOnePostMutation,
  useRemovePostMutation, 
  useCreatePostMutation,
  useUpdatePostMutation,
  useUpdateCountMutation
} = postsApi