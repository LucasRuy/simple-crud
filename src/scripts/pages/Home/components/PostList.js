import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import * as postsActions from 'actions/modules/postsActions'
import formatIsoDate from 'utils/formatIsoDate'

import { Shell, ShellPost } from 'components/Shell'
import { Post } from './Post'

const PostList = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts, shallowEqual)

  useEffect(() => {
    dispatch(postsActions.getAllPosts())
  }, [])

  if (posts.get.isRequest) {
    return (
      <Shell>
        <ShellPost />
        <ShellPost />
      </Shell>
    )
  }

  return (
    <ul>
      {posts.get.payload.map((post) => (
        <li key={post.id}>
          <Post id={post.id} title={post.title} content={post.content} author={post.username} date={formatIsoDate(new Date(post.created_datetime))} />
        </li>
      ))}
    </ul>
  )
}

export default PostList
