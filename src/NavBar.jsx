import React, {Component} from 'react'

// Rendering the navbar
class NavBar extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <div className="usersOnline">{this.props.userCounter} user(s) online</div>
            </nav>
        )
    }
}

export default NavBar;