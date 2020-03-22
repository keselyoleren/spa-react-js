import React, {Component} from 'react'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import Users from './Users.js'
import Home from './Home.js'
import Article from './Article.js'

class Router extends Component {
    render(){
        return (
            <BrowserRouter>
                <div className="conatiner">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse" >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/users">Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/article">Posts</Link>
                            </li>
                            </ul>
                        </div>
                    </nav>

                    <Switch>
                        <Route path="/article" component={Article}/>
                        <Route path="/users" component={Users} />
                        <Route path="/" component={Home}/>
                        
                    </Switch>
                
                </div>
            </BrowserRouter>
        )
    }
}

export default Router