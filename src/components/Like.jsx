import React, { useEffect, useState } from 'react'
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import service from '../appwrite/config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Like = ({ post, slug }) => {
    const { likes } = post
    const [like, setLike] = useState(false)
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    let parsedLikes = likes.map(d => JSON.parse(d))
    let currentUserStatus = parsedLikes.filter(d => d.Id === userData?.$id)
    const [likeCount, setLikeCount] = useState(parsedLikes.length)
    useEffect(() => {
        if (currentUserStatus.length === 1) {
            setLike(currentUserStatus[0].like)
        }
    }, [])

    let stringifiedLikes;


    function handleLike() {

        if (!userData) {
            navigate("/login")
        }
        setLike(like => !like)

        if (currentUserStatus.length) {
            parsedLikes = parsedLikes.filter((d) => d.Id !== userData.$id)
        }
        if (!like) {

            setLikeCount(likeCount + 1)
            parsedLikes.push({ like: !like, Id: userData.$id })
            toast.success("liked")
            stringifiedLikes = parsedLikes.map(d => JSON.stringify(d))

            updateCount()
        }
        if (like) {
            setLikeCount(likeCount - 1)
            stringifiedLikes = parsedLikes.filter((d) => d.Id !== userData.$id)
            toast.error("unliked")
            updateCount()
        }
        async function updateCount() {
            try {
                const updatedPost = await service.updatePost(slug, { likes: stringifiedLikes })

            } catch (error) {
                console.log("updatecount error", error);
            }
        }
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