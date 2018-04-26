import React, {Component} from 'react';
import {HashRouter as Router, Route} from "react-router-dom";
import Auth from "./components/Auth";
import SplashScreen from "./components/SplashScreen";
import Admin from "./components/Admin";
import {setUser} from "./components/User";

class App extends Component {

    state = {
        loaded: false
    };

    componentDidMount(){
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if(!user) throw new Error("kek");
            setUser(user);
        } catch (e){
        }
        this.setState({loaded: true});
    }

    render() {
        if(!this.state.loaded)
            return null;
        return (
            <Router>
                <div>
                    <Route exact path="/" component={SplashScreen}/>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/admin" component={Admin}/>
                </div>
            </Router>
        );
    }
}

export default App;