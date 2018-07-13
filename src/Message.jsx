import React, { Component } from 'react'

const imageUrlTest = /https?:\/\/.*\.(?:png|jpg|gif)/;



function handleArr(arrString) {

    arrString = arrString.map((string, index) => {
        if (string.match(imageUrlTest)) {
            return (<div>
                <span key={index} className="message-content"><img className='picture' src={string}/></span></div>)
        } else {
            return (<div>
                <span key={index} className="message-content">{string}</span>
            </div>)
        }
    })
    console.log('picture message:', arrString)
    return arrString
}

// }
// for (var i = 0; i < arrString.length; i++) {
//     if (arrString[i] !== imageUrlTest){
//         message.push(<span className="message system">{arrString[i]}</span>)
//     }else{
//         message.push(
//         <img className="picture" src={arrString[i]}/>)
//     }
// } 

const Message = (props) => {
    const color = {
        color: props.color
    }
    console.log("message", props.content)
    if (props.type === 'incomingMessage') {
        return (<div>
            <div className="message">
                <div className='userdiv'>
                <span style={color} className="message-username">{props.username}</span></div>
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
        
        <div className='message'><div className='userdiv'>
            <span style={color} className="message-username">{props.username}</span></div>
            {handleArr(props.content, props.username, props.color)}
        </div>
        
        )  
    }
}



export default Message;