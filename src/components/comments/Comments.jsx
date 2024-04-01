import React, { useState } from 'react'
import CommentsField from './CommentsField'

const Comments = ({ post, slug }) => {

    return (
        <CommentsField action="comment" post={post} slug={slug} />
    )
}

export default Comments