import React, { Component } from 'react'
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'
import NavBar from './NavBar.jsx'
// import Message             from './Message.jsx'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: {
        name: 'Anonymous',
        color: 'blue'
      },
      messages: [],
      userCounter: 0
    }
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001")
    // this.socket.onmessage = (evt) => {
    //   let parsed = (JSON.parse(evt))
    //   if (parsed.type === 'userColor'){
    //     this.setState ({currentUser: {color: parsed.color}})
    //   }
    // }
    //listenere to receive message from server
    this.socket.addEventListener("message", this.receiveMessage)

  }

  render() {
    return (
      <div>
        <NavBar userCounter={this.state.userCounter} />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name}
          addNewMessage={this.addNewMessage}
          setUser={this.setUser}
          onSubmitMessage={this.onSubmitMessage}
        />
      </div>
    );
  }

  //sending message to the server
  addNewMessage = (message, newUser) => {
    const newMessage = {
      username: newUser,
      content: message,
      type: 'userNewMessage',
      color: this.state.currentUser.color
    }
    console.log('color state', this.state.currentUser.color)
    if (newUser === '') {
      newMessage.username = 'Anonymous'
    } else {
      newMessage.username = newUser
    }
    this.socket.send(JSON.stringify(newMessage))
  }

  //handling message coming from the server
  receiveMessage = (receivedMessage) => {
    const msg = JSON.parse(receivedMessage.data);
    console.log('msgtype', msg.type)
    switch (msg.type) {
      case "incomingNotification":
      case "incomingMessage":
      case "incomingMessagePicture":
        const messages = this.state.messages.concat(msg)
        this.setState({ messages })
        // console.log('messages',messages)
        break;
      case "userOnline":
        this.setState({ userCounter: msg.count })
        // console.log('count',msg.count)
        break;
      case "userOffline":
        this.setState({ userCounter: msg.count })
        // console.log('count',msg.count)
        break;
      case "userColor":
        console.log('color', msg.color)
        this.setState(prevState => {
          const currentUser = prevState.currentUser;
          currentUser.color = msg.color
          return {
            currentUser: currentUser
          }
        })
        break;
    } console.log("messages", this.state.messages);
  }

  //username handler
  setUser = (evt) => {
    const systemMessage = {
      type: 'userNotification',
      username: this.state.currentUser.name,
      content: `${this.state.currentUser.name} changed to ${evt.target.value}`
    }
    console.log(evt.target.value)
    if (evt.keyCode === 13) {
      let newUser = evt.target.value
      if (newUser === '') {
        this.setState(prevState => {
          const currentUser = prevState.currentUser;
          currentUser.name = 'Anonymous'
          return {
            currentUser: currentUser
          }
        })
        this.socket.send(JSON.stringify(systemMessage))
      } else {
        this.setState(prevState => {
          const currentUser = prevState.currentUser;
          currentUser.name = newUser
          return {
            currentUser: currentUser
          }
        })
        this.socket.send(JSON.stringify(systemMessage))
      }
    }
  }

  //when enter is pressed on chatbar message
  onSubmitMessage = evt => {

    if (evt.keyCode === 13) {
      // this.setState({ currentUser: { name: this.state.currentUser.name } })
      console.log('name after enter', this.state.currentUser.name)
      let contentInput = evt.target.value;
      this.addNewMessage(contentInput, this.state.currentUser.name);
      evt.target.value = "";
    }
  }

  //updates the username as user type
  // userChange = evt => {
  //   console.log('userchange',evt.target.value)
  //   this.setState({currentUser: {name: evt.target.value}})
  // }
}


export default App;


    // switch (msg.type){
    //   case "message":
        // this.setState(oldMessages => ({
        //   ...oldMessages,
        //   messages: oldMessages.messages.concat(msg.data)
        // }))