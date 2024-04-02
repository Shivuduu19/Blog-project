import React, { useState } from 'react'
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import service from '../appwrite/config';
const Like = ({ post, slug }) => {
    const [like, setLike] = useState(false)
    const [likeCount, setLikeCount] = useState(post.likes)
    // const [likeStatus, setLikeStatus] = useState()
    const { title, content, featuredImage, status, comments } = post

    async function updateCount() {
        try {

            const updatedPost = await service.updatePost(slug, { title, content, featuredImage, status, likes: likeCount })
            console.log(updatedPost);
        } catch (error) {
            console.log("updatecount error", error);
        }
    }
    updateCount()
    console.log(like);
    console.log(likeCount);

    function handleLike() {
        setLike(like => !like)
        // if (!like) {
        //     setLike(true)
        console.log(like);
        console.log(likeCount);
        setLikeCount(like ? likeCount - 1 : likeCount + 1)
    }
    return (
        <div>
            <button className='text-3xl' onClick={handleLike}>
                {like ? <BiSolidLike />
                    : <BiLike />}
            </button>
            <h3>{likeCount}</h3>
        </div>
    )
}

export default Like