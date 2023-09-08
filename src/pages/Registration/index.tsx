import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import {useForm} from 'react-hook-form'
import { useAuthRegisterMutation } from "../../api/authApi";

import styles from "./Login.module.scss";

interface ValuesType {
  fullName: string,
  email: string,
  password: string
}

export const Registration = () => {

  const [newUser, {isLoading, isError}] = useAuthRegisterMutation()

  const {
    register, 
    handleSubmit, 
    setError, 
    formState: {errors}
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: 'onBlur'
  })

  const onSubmit = (values: ValuesType) => {
    console.log(values)

    newUser(values)
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          className={styles.field} 
          label="Полное имя" 
          error={errors?.fullName?.message ? true : false}
          helperText={errors?.fullName?.message}
          {
            ...register('fullName', {
              required: 'Введите свое имя',
              minLength: {
                value: 3,
                message: 'Имя не менее 3 символов'
              }
            })
          }
          fullWidth 
        />
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
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
