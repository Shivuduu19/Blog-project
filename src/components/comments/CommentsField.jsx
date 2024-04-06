import React, { useState } from 'react'
import service from '../../appwrite/config'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const CommentsField = ({ action, post, slug, updateState }) => {
  const navigate = useNavigate()
  const [comment, setComment] = useState("")
  const data = useSelector((state) => state.auth.userData)
  // console.log(data);
  const { comments } = post
  const userName = `@${data.email?.split('@')[0]}`
  // console.log(userName);

  const commentData = { comment, userName, date: new Date() }

  const handleComment = async () => {
    try {
      if (!data) {
        navigate("/login")
      }
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
      <textarea className='mx-10 w-[80%] md:w-[60%] overflow-auto h-[140px] resize-none pl-6 pt-3 border-gray-950 border-4 bg-transparent rounded-lg text-3xl' onChange={(e) => setComment(e.target.value)} value={comment}></textarea>
      <button className='bg-green-400 text-black p-2 rounded-md' onClick={handleComment}>{action}</button>
    </div>
  )
}

export default CommentsField