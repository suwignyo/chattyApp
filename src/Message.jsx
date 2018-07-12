import React, {Component} from 'react'



const Message = (props) => {
    const color ={
        color: props.color
    }
    if (props.type === 'incomingMessage'){
        return(<div>
            <div className="message">
                <span style={color} className="message-username">{props.username}</span>
                <span className="message-content">{props.content}</span>
            </div>
        </div>)
    } else if (props.type === 'incomingNotification'){
    return (<div>
                <span className="message system">{props.content}</span>
            </div>)
    
        }
    }



export default Message;