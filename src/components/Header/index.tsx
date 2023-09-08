import React from "react";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'

import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { setAuth } from "../../redux/slices/auth";

import { authMe } from "../../redux/slices/auth";
import { commentsType } from "../../redux/slices/comments";

export const Header: React.FC = () => {

  const dispatch = useDispatch()
  const {auth} = useSelector(authMe)
  const {commentsQuantity} = useSelector(commentsType)

  console.log(Boolean(window.localStorage.getItem('token')))
  console.log(commentsQuantity)

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      // dispatch(setAuth(false))
      window.localStorage.removeItem('token')
      window.location.reload()
    }
  }

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link to={'/'} className={styles.logo}>
            <div>ARCHAKOV BLOG</div>
          </Link>
          {
            Boolean(window.localStorage.getItem('token')) ? (
              <div className={styles.buttons}>
                <Link to={'/add-post'}>
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Link to={'/'}>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={onClickLogout}
                  >
                    Выйти
                  </Button>
                </Link>
              </div>
            ) : <div className={styles.buttons}>
                <Link to={'/login'}>
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to={'/register'}>
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
            </div>
          }
        </div>
      </Container>
    </div>
  );
};
