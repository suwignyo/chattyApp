import React, { Component } from 'react'

const imageUrlTest = /https?:\/\/.*\.(?:png|jpg|gif)/;


//handles array of incoming messages and check whether it is a link or
//just a string and returns the proper html
function handleArr(arrString) {

    arrString = arrString.map((string, index) => {
        if (string.match(imageUrlTest)) {
            return (
                <img key='index' className='picture' src={string} />)
        } else {
            return (
                string + ' '
            )
        }
    })
    return arrString
}

//hands incoming message depending on its type
const Message = (props) => {
    const color = {
        color: props.color
    }
    if (props.type === 'incomingMessage') {
        return (
            <div>
                <div className="message">
                    <div className='userdiv'>
                        <span style={color} className="message-username">{props.username}</span>
                    </div>
                    <div>
                        <span className="message-content">{props.content}</span>
                    </div>
                </div>
            </div>)
    } else if (props.type === 'incomingNotification') {
        return (<div>
            <span className="message system">{props.content}</span>
        </div>)

    } else if (props.type === 'incomingMessagePicture') {
        return (
            <div>
                <div className='message'>
                    <div className='userdiv'>
                        <span style={color} className="message-username">{props.username}</span>
                    </div>
                    <div>
                        <span className="message-content">{handleArr(props.content)}</span>

                    </div>
                </div>
            </div>

        )
    }
}



export default Message;