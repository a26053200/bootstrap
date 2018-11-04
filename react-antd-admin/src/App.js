import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Login from './routes/Login/index'
import Index from './routes/Index/index'

class App extends Component {
    render() {
        return (
            <Switch>
                <Route path='/login' component={Login}/>
                <PrivateRoute path='/' component={Index}/>
            </Switch>
        );
    }
}

export default App;
