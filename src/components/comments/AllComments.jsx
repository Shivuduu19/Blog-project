import React from 'react'

const AllComments = ({ comments }) => {
    // console.log(comments);

    return (
        <div className=' flex flex-col gap-4 justify-center items-center text-start mt-5 w-full ' >
            {comments.map((comment) => (
                <div key={comment.$createdAt} className=' text-xl md:text-2xl w-[60%]'>
                    <h2 className='md:text-3xl font-bold mt-2'>{comment.userName}</h2>
                    <p className='text-sm'>{(new Date(comment.date).toLocaleDateString())}</p>
                    <p>{comment.comment}</p>
                </div>))}
        </div>
    )
}

export default AllComments