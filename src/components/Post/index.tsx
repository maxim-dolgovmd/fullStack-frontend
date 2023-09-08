import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import styles from "./Post.module.scss";
import { UserInfo } from "../UserInfo";
import { PostSkeleton } from "./Skeleton";

import {useSelector, useDispatch} from 'react-redux'
import { useRemovePostMutation } from "../../api/postsApi";
import { setRemovePostsId } from "../../redux/slices/posts";
import { addCommentsCount } from "../../utils/addCommentsCount";

type UserType = {
  avatarUrl: string,
  createdAt: string,
  email: string,
  fullName: string,
  passwordHash: string,
  updatedAt: string,
  _id: string,
}

interface PostType {
  id?: string,
  title?: string,
  createdAt?: string,
  imageUrl?: string,
  user?: UserType,
  viewsCount?: number,
  commentsCount?: any,
  tags?: string[],
  children?: any,
  isFullPost?: boolean,
  isLoading?: boolean,
  isEditable?: boolean
}

export const Post: React.FC<PostType> = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {

  console.log(commentsCount)

  const dispatch = useDispatch()
  const [removePost] = useRemovePostMutation()

  const removeId = () => {
    if (id && window.confirm('Вы действительно хотите удалить статью?')) {
      removePost({id})
      dispatch(setRemovePostsId(id))
    }
  }

  if (isLoading) {
    return <PostSkeleton />;
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={removeId} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {
        imageUrl ? <img
        className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
        src={imageUrl}
        alt={title}
      /> : ''
      }
      <div className={styles.wrapper}>
        <UserInfo avatarUrl={user?.avatarUrl} fullName={user?.fullName} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags?.map((name) => (
              <li key={name}>
                <Link to={`/tags/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>
                {
                  // Array.isArray(commentsCount) ?
                  commentsCount
                    ?.filter((obj: any) => obj._id === id )
                    ?.map((obj: any) => (
                      <div key={obj._id}>{obj.count}</div>
                    )) 
                }
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
