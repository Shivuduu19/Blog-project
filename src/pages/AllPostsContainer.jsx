import React from 'react'
import AllPosts from './AllPosts';

const AllPostsContainer = () => {
    const userData = useSelector((state) => state.auth)
    console.log(userData);
    return (
        <AllPosts userData={userData} />
    )
}

export default AllPostsContainer