import React, { useState } from 'react'
import service from '../../appwrite/config'

const CommentsField = ({ action, post, slug }) => {
  const [comment, setComments] = useState([])
  const { title, content, featuredImage, status, comments } = post
  // comments =[...comments, comment]
  const handleComment = async () => {
    try {
      const updatePost = await service.updatePost(slug, { title, content, featuredImage, status, comments: [...comments, comment] })

      console.log(updatePost);
    } catch (error) {

    }
  }
  return (
    <div className='flex flex-col gap-3 justify-center items-center w-full'>
      <textarea className='mx-10  w-[60%] overflow-auto h-[140px] resize-none pl-6 pt-3 border-gray-950 border-4 bg-transparent rounded-lg text-3xl' onChange={(e) => setComments(e.target.value)}></textarea>
      <button className='bg-green-400 p-2 rounded-md' onClick={handleComment}>{action}</button>
    </div>
  )
}

export default CommentsField