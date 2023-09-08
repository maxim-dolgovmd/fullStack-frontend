import React from "react";
import {useParams} from "react-router-dom";
import ReactMarkdown  from "react-markdown";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useGetOnePostQuery } from "../api/postsApi";
import { useGetOneCommentsQuery } from "../api/commentsApi";

import {useSelector, useDispatch} from 'react-redux'
import { commentsType } from "../redux/slices/comments";


export const FullPost = () => {

  const {id} = useParams()
  const dispatch = useDispatch()
  const {commentsQuantity} = useSelector(commentsType)

  const {data, isLoading} = useGetOnePostQuery({id})
  const {data: comments, isLoading: loading} = useGetOneCommentsQuery({id})
  console.log(data)

  if (isLoading) {
    return <Post isLoading={true} isFullPost/>
  }

  return (
    <>
      <Post
        id={id}
        title={data?.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data?.user}
        createdAt={data?.createdAt}
        viewsCount={data?.viewsCount}
        commentsCount={commentsQuantity}
        tags={data?.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={comments}
        isLoading={loading}
      >
        <Index article={data} id={id ? id : ''}/>
      </CommentsBlock>
    </>
  );
};
