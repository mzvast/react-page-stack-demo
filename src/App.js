import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Stack from './Stack';
import A from '@/pages/A';
import AA from '@/pages/AA';
import B from '@/pages/B';
import C from '@/pages/C';
import Top from '@/pages/Top';
function AppRoute(props) {
    return (
        <Switch location={props.location}>
            <Route path="/a/aa" component={AA} />
            <Route path="/a" component={A} />
            <Route path="/b" component={B} />
            <Route path="/c" component={C} />
            <Route path="/" component={Top} />
        </Switch>
    );
}
class App extends Component {
    render() {
        return (
            <Router>
                <Stack appRoute={AppRoute} />
            </Router>
        );
    }
}
export default App;
