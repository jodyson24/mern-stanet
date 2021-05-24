import React from 'react'
import LeftSide from '../../components/message/LeftSide'
import RightSdie from '../../components/message/RightSide'

export default function Conversation() {
    return (
        <div className="message d-flex">
            <div className="col-md-4 border-right px-0">
                <LeftSide />
            </div>

            <div className="col-md-8 px-0">
                <RightSdie />
            </div>
        </div>
    )
}
