import React from "react"
import { useGetOneCommentsQuery } from "../api/commentsApi";

export const countsComment = (id: string) => {
    const {data: comments, isLoading: loading} = useGetOneCommentsQuery({id})
}