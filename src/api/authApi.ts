import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const BASE_URL = 'http://localhost:4444'

interface AuthsType {
  _id: string,
  fullName: string,
  email: string,
  avatarUrl: string,
  createdAt: string,
  updatedAt: string
}

interface RegistersType {
  email: string,
  password: string,
  fullName: string
}

interface LoginsType {
  email: string,
  password: string,
}

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery(
    {baseUrl: BASE_URL}
  ),
  endpoints: (builder) => ({
    authRegister: builder.mutation<null, RegistersType>({
      query: ({email, password, fullName}) => {
        return {
            url: '/auth/register',
            method: 'POST',
            body: {
                email: email,
                password: password,
                fullName: fullName,
                avatarUrl: 'https://w7.pngwing.com/pngs/728/545/png-transparent-avatar-face-male-man-people-profile-user-avatar-user-icon.png'
            },
            headers: {
              Authorization: window.localStorage.getItem('token') as any
            }
        }
      }
    }),

    authLogin: builder.mutation<null, LoginsType>({
        query: ({email, password}) => {
            return {
                url: '/auth/login',
                method: 'POST',
                body: {
                    email: email,
                    password: password
                },
                headers: {
                  Authorization: window.localStorage.getItem('token') as any
                }
            }
        }
    }),

    authMe: builder.mutation<AuthsType, void>({
      query: () => {
        return {
          url: '/auth/me',
          method: 'GET',
          headers: {
            Authorization: window.localStorage.getItem('token') as any
          }
        }
      }
    })
  })
})


export const { useAuthRegisterMutation, useAuthLoginMutation, useAuthMeMutation } = authApi