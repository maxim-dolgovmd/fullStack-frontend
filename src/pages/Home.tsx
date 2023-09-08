import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";

import {useSelector, useDispatch} from 'react-redux'

import { useGetPostQuery, useGetTagsQuery } from "../api/postsApi";
import { useGetAllCommentsQuery } from "../api/commentsApi";

import { reverseArray } from "../utils/reverseArray";
import { authMe } from "../redux/slices/auth";
import { removeId } from "../redux/slices/posts";
import { commentsType } from "../redux/slices/comments";
import { setCommentsQuantity } from "../redux/slices/comments";


const tabs = [
  'Все',
  'Новые',
  'Популярные'
]

export const Home = () => {

  const dispatch = useDispatch()
  const {data: commentsAll, isLoading: loadingComments} = useGetAllCommentsQuery()
  const {data: tags, isLoading: loadingTags} = useGetTagsQuery()

  const {auth} = useSelector(authMe)
  const {removePostsId} = useSelector(removeId)
  const {commentsQuantity} = useSelector(commentsType)
  const [sort, setSort] = React.useState(0)

  // const {data, isLoading: loading, isFetching} = useGetPostQuery(sort, {pollingInterval: 5000})
  const {data, isLoading: loading} = useGetPostQuery(sort)
  console.log(data)
  console.log(tags)
  console.log(commentsQuantity)


  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={sort}
        aria-label="basic tabs example"
      >
        {/* <Tab label="Все" />
        <Tab label="Новые" />
        <Tab label="Популярные" /> */}
        {
          tabs.map((tab, i) => {
            return (
              <Tab key={i} onClick={() => setSort(i)} label={tab} />
            )
          })
        }
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(loading ? [...Array(5)] : (data || []))
            .filter((post) => post?._id !== removePostsId)
            .map((obj, index) => loading ? (<Post key={index} isLoading={true}/>) :
            (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={commentsQuantity}
                tags={obj.tags}
                isEditable={auth?._id === obj?.user?._id}
              />
            ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={tags}
            isLoading={loadingTags}
          />
          <CommentsBlock
            items={reverseArray(commentsAll)?.slice(0, 5)}
            isLoading={loadingComments}
          />
        </Grid>
      </Grid>
    </>
  );
};
