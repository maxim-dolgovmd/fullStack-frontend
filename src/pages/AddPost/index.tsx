import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import {useSelector, useDispatch} from 'react-redux'
import {useNavigate , Navigate, useParams} from 'react-router-dom'

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";

import { useAddFileMutation } from "../../api/imageApi";
import { useCreatePostMutation, useOnePostMutation, useUpdatePostMutation } from "../../api/postsApi";
import { authMe } from "../../redux/slices/auth";

type UrlType = {
  url: string
}

type imageType = {
  data: UrlType
}

export const AddPost: React.FC = () => {

  const {id} = useParams()
  const navigate = useNavigate()

  const [updatePost] = useUpdatePostMutation()
  const [imageUrl, setImageUrl] = React.useState('')
  const [value, setValue] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null)
  
  const {auth} = useSelector(authMe)

  const [addFile] = useAddFileMutation()
  const [createPost] = useCreatePostMutation()
  const [onePost] = useOnePostMutation()

  const onChange = React.useCallback((value: string) => {
    setValue(value);
  }, []);

  const onClickRemoveImage = () => {
    setImageUrl('')
  }

  const handleChangeFile = async (event: React.ChangeEvent<any>) => {
    // console.log(event.target.files)
    try {
      
      const formData = new FormData()
      const file = event.target.files[0]

      formData.append('image', file)

      const {data}: any = await addFile(formData)

      setImageUrl(data.url)

    } catch (error) {
      console.log(error)
      alert('Ошибка при загрузке файла')
    }
  }

  const onSubmit = async () => {
    try {
      
      const {data}: any = await createPost({title, tags, value, imageUrl})
      
      const id = data.post._id
      
      navigate(`/posts/${id}`)

    } catch (error) {
      console.log(error)
      alert('Статья не создана')
    }
  }

  const uptatePostId = async () => {
    if (id) {
      await updatePost({id, title, tags, value, imageUrl})
      navigate(`/posts/${id}`)
    }
  }


  React.useEffect(() => {

    const getPostId = async () => {
      if (id) {
        const {data: post}: any = await onePost({id})
        console.log(post)

        setImageUrl(post.imageUrl)
        setTags(post.tags.join(','))
        setTitle(post.title)
        setValue(post.text)
      }
    }

    getPostId()
  }, [id])

  const options: any = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem('token') && !Object.keys(auth || '').length) {
    return <Navigate to="/" />
  }

  console.log(imageUrl)

  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large" onClick={() => inputRef.current?.click()}>
        Загрузить превью
      </Button>
      <input ref={inputRef} type="file" onChange={handleChangeFile} hidden/>
      {
        imageUrl && (
          <>
            <div style={{paddingLeft: '24px', display: 'inline-flex'}}>
              <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                Удалить
              </Button>
            </div>
            <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
          </>
        )
      }
      <br />
      <br />
      <form>
        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Заголовок статьи..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          classes={{ root: styles.tags }}
          variant="standard"
          placeholder="Тэги"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
        />
        <SimpleMDE
          className={styles.editor}
          value={value}
          onChange={onChange}
          options={options}
        />
        <div className={styles.buttons}>
          {
            id ? (
              <Button onClick={uptatePostId} size="large" variant="contained">
                Редактировать
              </Button>
            ) : (
              <Button onClick={onSubmit} size="large" variant="contained">
                Опубликовать
              </Button>
            )
          }
          <Button size="large" onClick={() => navigate('/')}>Отмена</Button>
      </div>
      </form>
    </Paper>
  );
};
