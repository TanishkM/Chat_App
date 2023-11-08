import React from 'react'

const Message = ({ username, messageList }) => {
    return (
        <div>

                {(messageList.map((messageContect) => {
                return (<div className='message' id={username === messageContect.author ? "you" : "other"}>
                    <div>
                        <div className="message-content">
                            <p>{messageContect.message}</p>
                        </div>
                        <div className="message-meta">
                            <p id='time'>{messageContect.time} </p>
                            <p id='author'>{messageContect.author}</p>

                        </div>

                    </div>

                </div>
                )
            }))}

        </div>
    )
}

export default Message
