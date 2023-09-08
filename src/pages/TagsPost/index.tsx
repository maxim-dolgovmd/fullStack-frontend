import React from "react";
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import { useFindTagsQuery } from "../../api/tagsApi";
import { Post } from "../../components";
import { CommentsBlock } from "../../components";
import { useGetAllCommentsQuery } from "../../api/commentsApi";

import { reverseArray } from "../../utils/reverseArray";

import Grid from "@mui/material/Grid";
import { authMe } from "../../redux/slices/auth";
import { commentsType } from "../../redux/slices/comments";

type UserType = {
    avatarUrl: string,
    createdAt: string,
    email: string,
    fullName: string,
    passwordHash: string,
    updatedAt: string,
    _id: string,
  }

interface TagsDataType {
    createdAt: string,
    updatedAt: string,
    tags?: string[],
    text: string
    _id: string,
    title: string,
    user: UserType,
    viewsCount: number,
    imageUrl?: string,
    count: number
}

export const TagsPost = () => {

    const {id} = useParams()
    console.log(id)
    const {commentsQuantity} = useSelector(commentsType)

    const {data, isLoading: loading} = useFindTagsQuery({id})
    const {auth} = useSelector(authMe)
    const {data: comments, isLoading: loadingComments} = useGetAllCommentsQuery()
    console.log(data)

    return (
        <div>
            <div style={{
                fontSize: '42px', 
                color: 'rgb(58, 131, 171)', 
                fontWeight: '600', 
                lineHeight: '36px',
                marginBottom: '40px'
            }}>
                #Заметки
            </div>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {(loading ? [...Array(3)] : data)
                        .map((obj: TagsDataType, index: number) => loading ? (<Post key={index} isLoading={true}/>) : (
                            <Post
                                key={index}
                                id={obj._id}
                                title={obj.title}
                                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                                user={obj.user}
                                createdAt={obj.createdAt}
                                viewsCount={obj.viewsCount}
                                commentsCount={commentsQuantity}
                                tags={obj.tags}
                                isEditable={auth?._id === obj?.user?._id}
                            />
                        ))
                    }
                </Grid>
                <Grid xs={4} item>
                    <CommentsBlock
                        items={reverseArray(comments)?.slice(0, 5)}
                        isLoading={loadingComments}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

