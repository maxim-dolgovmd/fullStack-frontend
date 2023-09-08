import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

type UrlType = {
  url: string
}

type imageType = {
  data: UrlType
}

const BASE_URL = 'http://localhost:4444'

export const imageApi = createApi({
  reducerPath: 'image',
  baseQuery: fetchBaseQuery(
    {baseUrl: BASE_URL}
  ),
  endpoints: (builder) => ({
    addFile: builder.mutation<imageType, FormData> ({
      query: (formData) => {
        console.log(formData)
        return {
            url: '/upload',
            method: 'POST',
            body: formData,
            headers: {
              Authorization: (window.localStorage.getItem('token') as any)
            }
        }
      }
    }),

  })
})


export const { useAddFileMutation } = imageApi