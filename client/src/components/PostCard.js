import React from 'react'
import CardHeader from './home/post_card/CardHeader'
import CardBody from './home/post_card/CardBody'
import CardFooter from './home/post_card/CardFooter'

import Comments from './home/Comments'
import InputComment from './home/InputComment'


export default function PostCard({ post, theme }) {
    return (
        <div>
            <div className="card my-3">
                <CardHeader post={post} />
                <CardBody post={post} theme={theme} />
                <CardFooter post={post}/>
 
                <Comments post={post} theme={theme} />
                <InputComment post={post} theme={theme} />
            </div>
        </div>
    )
}
