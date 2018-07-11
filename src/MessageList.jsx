import React, {Component}   from 'react'
import Message              from './Message.jsx'


class MessageList extends Component {
    render() {
        return (
            <main className="messages">
                {this.props.messages.map(messageArr =>
                    <Message    content={messageArr.content}
                                username={messageArr.username}
                                key={messageArr.id}/>
                )}
            </main>
        )
    }
}

export default MessageList;