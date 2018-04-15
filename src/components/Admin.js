import React, {Component} from 'react'
import {Container, Menu} from 'semantic-ui-react'
import {getUser, setUser} from "./User";
import {Link, Redirect, Route} from "react-router-dom";
import Users from "./Admin/Users";
import Jobs from "./Admin/Jobs";
import Reports from "./Admin/Reports";
import Dashboard from "./Admin/Dashboard";
import JobInfo from "./Admin/JobInfo";

export default class Admin extends Component {

    state = {
        logout: false,
    };

    logout = () => {
        setUser(null);
        this.setState({logout: true});
    };

    render() {

        if (this.state.logout || !getUser())
            return <Redirect to="/auth"/>;

        const {match} = this.props;
        const {pathname} = this.props.location;

        return (
            <div>
                <Menu fixed='top' inverted>
                    <Container>
                        <Link to={match.url}>
                            <Menu.Item header>
                                Admin panel
                            </Menu.Item>
                        </Link>
                        <Link to={`${match.url}/users`}><Menu.Item active={pathname.includes(`${match.url}/users`)}>Users</Menu.Item></Link>
                        <Link to={`${match.url}/jobs`}><Menu.Item active={pathname.includes(`${match.url}/jobs`)}>Jobs</Menu.Item></Link>
                        <Link to={`${match.url}/reports`}><Menu.Item active={pathname.includes(`${match.url}/reports`)}>Reports</Menu.Item></Link>
                        <Menu.Menu position='right'>
                            <Menu.Item onClick={this.logout}>Logout</Menu.Item>
                        </Menu.Menu>
                    </Container>
                </Menu>

                <Container text style={{marginTop: '7em'}}>
                    <Route path={`${match.url}/users`} component={Users}/>
                    <Route exact path={`${match.url}/jobs`} component={Jobs}/>
                    <Route path={`${match.url}/jobs/add`} component={JobInfo}/>
                    <Route path={`${match.url}/jobs/edit/:id`} component={JobInfo}/>
                    <Route path={`${match.url}/reports`} component={Reports}/>
                    <Route
                        exact
                        path={match.url}
                        component={Dashboard}
                    />
                </Container>
            </div>
        )
    }
}
