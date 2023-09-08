import React from "react";

import styles from './AddComment.module.scss'
import {useSelector, useDispatch} from 'react-redux'

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { setNewComments } from "../../redux/slices/comments";

import { useCreateCommentsMutation } from "../../api/commentsApi";

import { authMe } from "../../redux/slices/auth";
import { commentsType } from "../../redux/slices/comments";
import { setCommentsQuantity } from "../../redux/slices/comments";
import { useUpdateCountMutation } from "../../api/postsApi";
import { addCommentsCount } from "../../utils/addCommentsCount";

type PropsId = {
  id: string | null,
  article: any
}

export const Index: React.FC<PropsId> = ({article, id}) => {

  const dispatch = useDispatch()

  const inputRef = React.useRef<HTMLDivElement>(null)
  const {auth} = useSelector(authMe)
  const [value, setValue] = React.useState('')
  const [createComments, {isLoading}] = useCreateCommentsMutation()
  const [updateCount] = useUpdateCountMutation()
  const {commentsNew, commentsQuantity} = useSelector(commentsType)
  console.log(article)

  const onSubmit = () => {
    dispatch(setNewComments(true))
    if (id) {
      createComments({value, id})
      // updateCount({article, id})
      // addCommentsCount(article)
      dispatch(setCommentsQuantity(article))
      console.log(article)
    }
    setValue('')
    inputRef.current?.blur()

    setTimeout(() => {
      dispatch(setNewComments(false))
    }, 3000);
  }

  console.log(commentsQuantity)
  console.log(article)

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={`${auth.avatarUrl}`}
        />
        <div className={styles.form} style={{position: 'relative'}}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            multiline
            fullWidth
            ref={inputRef}
          />
          <Button type="submit" onClick={onSubmit} disabled={value.length === 0} variant="contained">Отправить</Button>
          {
            commentsNew && (
              <div style={{
                display: 'flex',
                flexDirection: 'column', 
                backgroundColor: '#15ea9f', 
                padding: '20px 10px', 
                position: 'absolute', 
                right: '0px', 
                bottom: '0px',
                borderRadius: '10px',
                transform: 'scale(1)',
                transition: '0.5s',
              }}>
                <div>Комментарий создан</div>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};
