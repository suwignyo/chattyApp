import React, {Component} from 'react'
import MessageList        from './MessageList.jsx'
import ChatBar            from './ChatBar.jsx'
import NavBar             from './NavBar.jsx'
// import Message             from './Message.jsx'
const uuid = require('uuid/v1')

class App extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: []
    }
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001")

    //listenere to receive message from server
    this.socket.addEventListener("message", this.receiveMessage)  
    
  }

  render() {
    return (
      <div>
        <NavBar/>
        <MessageList messages = {this.state.messages}></MessageList>
        <ChatBar currentUser = {this.state.currentUser.name}
                 addNewMessage = {this.addNewMessage}
                 setUser = {this.setUser}
                 onKeyDown = {this.onKeyDown}
                  />
      </div>
    );
  }

  //sending message to the server
  addNewMessage = (message, newUser) => {
    const newMessage = {
      username: newUser,
      content: message,
      id: uuid(),
    }
    if (newUser === ''){
      newMessage.username = 'Anonymous'
    } else {
      newMessage.username = newUser
  }
    this.socket.send(JSON.stringify(newMessage))
  }
  
  //handling message coming from the server
  receiveMessage = (receivedMessage) => {
    const msg = JSON.parse(receivedMessage.data);
    console.log('msg', msg)
    const messages = this.state.messages.concat(msg)
    this.setState({messages})
    // switch (msg.type){
    //   case "message":
        // this.setState(oldMessages => ({
        //   ...oldMessages,
        //   messages: oldMessages.messages.concat(msg.data)
        // }))
        console.log("messages",this.state.messages);
        // break;
        // default:
    
  }

  //username handler
  setUser = (evt) => {
    console.log(evt.target.value)
    let newUser = evt.target.value
    if (this.state === ''){
      this.setState({currentUser: {name:'Anonymous'}})
    }else{
      this.setState({currentUser: {name: newUser}})
    }
  }

  //when enter is pressed on chatbar message
  onKeyDown = evt => {
    if (evt.keyCode === 13){
      let contentInput = evt.target.value;
      this.addNewMessage(contentInput, this.state.currentUser.name);
      evt.target.value = "";
        
    }
}
  

}
export default App;
