import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom'
import Login from './routes/Login/index'
import Index from './routes/Index/index'

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/index' component={Index}/>
            </Switch>
        );
    }
}

export default App;
