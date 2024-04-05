import React, { useEffect, useState } from 'react'
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import service from '../appwrite/config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Like = ({ post, slug }) => {
    const { likes } = post
    const [like, setLike] = useState(false)
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    console.log(userData);
    // console.log(likes);
    let parsedLikes = likes.map(d => JSON.parse(d))
    console.log(parsedLikes);
    let currentUserStatus = parsedLikes.filter(d => d.Id === userData?.$id)
    // console.log(currentUserStatus);
    const [likeCount, setLikeCount] = useState(parsedLikes.length)
    useEffect(() => {
        if (currentUserStatus.length === 1) {
            console.log(currentUserStatus);
            setLike(currentUserStatus[0].like)
        }
    }, [])
    // if (currentUserStatus.length) {
    //     setLike(currentUserStatus.likeStatus)
    // }
    // const [likeStatus, setLikeStatus] = useState()
    // console.log(parsedLikes);
    let stringifiedLikes;
    // console.log(stringifiedLikes);
    // console.log(like);
    // console.log(likeCount);

    function handleLike() {
        // console.log(like);
        if (!userData) {
            navigate("/login")
        }
        setLike(like => !like)
        console.log(stringifiedLikes);
        if (currentUserStatus.length) {
            console.log(currentUserStatus);
            console.log(parsedLikes);
            parsedLikes = parsedLikes.filter((d) => d.Id !== userData.$id)
            console.log(parsedLikes);

        }
        console.log(stringifiedLikes);
        if (!like) {
            // console.log(like);
            setLikeCount(likeCount + 1)
            parsedLikes.push({ like: !like, Id: userData.$id })
            stringifiedLikes = parsedLikes.map(d => JSON.stringify(d))
            // console.log(parsedLikes);
            // console.log(stringifiedLikes);
            updateCount()
        }
        if (like) {
            setLikeCount(likeCount - 1)
            stringifiedLikes = parsedLikes.filter((d) => d.Id !== userData.$id)
            // console.log(stringifiedLikes);
            updateCount()

            //     setLike(true)
        }
        // console.log(like);
        // console.log(likeCount);
        // setLikeCount(like ? likeCount - 1 : likeCount + 1)
        async function updateCount() {
            try {
                // console.log("shiva");
                console.log(stringifiedLikes);
                const updatedPost = await service.updatePost(slug, { likes: stringifiedLikes })
                console.log(updatedPost);
            } catch (error) {
                console.log("updat  ecount error", error);
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