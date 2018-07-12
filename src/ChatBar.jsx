import React, {Component} from 'react'



class ChatBar extends Component {
    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" defaultValue={this.props.currentUser} onKeyDown={this.props.setUser}/>
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.props.onSubmitMessage}/>
            </footer>
        )
    }
}

export default ChatBar;