import React from 'react'

const AllComments = ({ post }) => {
    return (
        <div className=' flex flex-col gap-4 justify-center items-center text-start mt-5 w-full ' >
            {post.comments.map((comment) => (
                <div className='text-2xl w-[60%]'>
                    <h2 className='text-3xl font-bold'>{post.name}</h2>
                    <p>{comment}</p>
                </div>))}
        </div>
    )
}

export default AllComments