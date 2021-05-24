import React, { useState, useEffect } from 'react'
import CommentCard from './CommentCard'

export default function CommentDisplay({ comment, post, replyCm, theme }) {
    const [showRep, setShowRep] = useState([])
    const [next, setNext] = useState(1)

    useEffect(() => {
        setShowRep(replyCm.slice(replyCm.length - next))
    }, [replyCm, next])

    return (
        <div className="comment_display">
            <CommentCard comment={comment} post={post} commentId={comment._id} >
                <div className="pl-4">
                    {
                        showRep.map((item, index) => (
                            item.reply &&
                            <CommentCard
                                key={index}
                                comment={item}
                                post={post}
                                commentId={comment._id}
                                theme={theme}
                            />
                        ))
                    }

                    {
                        replyCm.length - next > 0
                            ? <div 
                                style={{ cursor: 'pointer', color: 'crimson' }}
                                onClick={() => setNext(next + 10)} >
                                see more replies....
                            </div>
                            : replyCm.length > 1 &&
                            <div
                                style={{ cursor: 'pointer', color: 'crimson', transition: '4s' }}
                                onClick={() => setNext(1)} >
                                see less replies...
                            </div>
                    }
                </div>
            </CommentCard>
        </div>
    )
}
