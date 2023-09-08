import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { useAuthLoginMutation } from "../../api/authApi";
import {useForm} from 'react-hook-form'
import {Navigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {authMe, setAuth} from '../../redux/slices/auth'

import styles from "./Login.module.scss";

type DataType = {
  email: string,
  password: string
}

export const Login = () => {

  const dispatch = useDispatch()
  const [loginAuth, {isLoading}] = useAuthLoginMutation()
  const {auth} = useSelector(authMe)

  const {
    register, 
    handleSubmit, 
    setError, 
    formState: {errors}
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur'
  })

  const onSubmit = async (values: DataType) => {
    console.log(values)
    const {data}: any = await loginAuth(values)

    if (Boolean(!data)) {
      alert('Не удалось авторизоваться')
    } else {
      window.localStorage.setItem('token', data.token)
    }

    console.log(data)
    dispatch(setAuth(data))
  }

  console.log(auth)

  if (Object.keys(auth || '').length > 0) {
    return <Navigate to="/" />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={errors?.email?.message ? true : false}
          helperText={errors?.email?.message}
          {
            ...register('email', {
              required: 'Введите свой email',
              pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}/,
                message: 'Некорректный email',
              }
            })
          }
          fullWidth
        />
        <TextField 
          className={styles.field} 
          label="Пароль" 
          fullWidth 
          error={errors?.password?.message ? true : false}
          helperText={errors?.password?.message}
          {
            ...register('password', {
              required: 'Введите пароль',
              minLength: {
                value: 6,
                message: 'Пароль не менее 6 символов'
              }
            })
          }
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
