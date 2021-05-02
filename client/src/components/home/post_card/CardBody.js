import React from 'react'
import Carousel from '../../Carousel'

export default function CardBody({ post, theme }) {
 

    return (
        <div className="card_body">
            {
                post.images.length > 0 && <Carousel images={post.images} id={post._id} theme={theme} />
            }
            
        </div>
    )
}
