import React, {Component} from 'react'



class Message extends Component {
    render() {
        return (
            <div>
            <div className="message">
                <span className="message-username">{this.props.username}</span>
                <span className="message-content">{this.props.content}</span>
            </div>
            <div>
                <span className="message system">Anonymous1 changed their name to nomnom.</span>
            </div>
            </div>
        )
    }
}

export default Message;