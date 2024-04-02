import React, { useState } from 'react'
import CommentsField from './CommentsField'
import AllComments from './AllComments'


const Comments = ({ post, slug }) => {
    const data = post.comments.map((da) => JSON.parse(da))
    const [comments, setComments] = useState(data)
    const updateState = (d) => {
        setComments(d)
    }
    console.log(comments);

    return (
        <div>
            <CommentsField action="comment" post={post} slug={slug} updateState={updateState} />
            <AllComments comments={comments} />
        </div>
    )
}

export default Comments