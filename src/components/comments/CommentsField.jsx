import React, { useState } from 'react'
import service from '../../appwrite/config'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const CommentsField = ({ action, post, slug, updateState }) => {
  const [comment, setComment] = useState("")
  const data = useSelector((state) => state.auth.userData.userData)
  // console.log(data);
  const { title, content, featuredImage, status, comments } = post
  // console.log(comments);

  const commentData = { comment, name: data?.name, date: new Date() }

  const handleComment = async () => {
    try {
      console.log("shiva");
      comments.push(JSON.stringify(commentData))
      const updatePost = await service.updatePost(slug, { comments })
      console.log(updatePost);
      const updatedComments = (updatePost.comments.map((d) => JSON.parse(d)))
      toast("comment added")
      console.log(updatedComments);
      updateState(updatedComments)
      setComment("")

      // console.log(updatePost);
    } catch (error) {
      toast("comment invalid")
      console.log(" adding comment Error ", error);
    }
  }
  return (
    <div className='flex flex-col gap-3 justify-center items-center w-full'>
      <textarea className='mx-10  w-[60%] overflow-auto h-[140px] resize-none pl-6 pt-3 border-gray-950 border-4 bg-transparent rounded-lg text-3xl' onChange={(e) => setComment(e.target.value)} value={comment}></textarea>
      <button className='bg-green-400 p-2 rounded-md' onClick={handleComment}>{action}</button>
    </div>
  )
}

export default CommentsField