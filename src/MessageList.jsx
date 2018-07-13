import React, {Component}   from 'react'
import Message              from './Message.jsx'


class MessageList extends Component {
    render() {
        return (
            <main className="messages container-fluid p-0">
                
                {this.props.messages.map(messageArr =>
                    <Message    content={messageArr.content}
                                username={messageArr.username}
                                key={messageArr.id}
                                notification={messageArr.notification}
                                type={messageArr.type}
                                color={messageArr.color}/>
                )}
            </main>
        )
    }
}

export default MessageList;