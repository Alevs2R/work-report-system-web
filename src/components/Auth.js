import React, {Component} from 'react';
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'
import {login} from "../api/auth";
import {getUser, setUser} from "./User";
import {Redirect} from "react-router-dom";

export default class Auth extends Component {

    state = {
        loading: false,
        username: '',
        password: '',
        error: null,
        success: false,
    };

    loginClicked = async () => {
        try {
            this.setState({loading: true});
            const user = await login(this.state.username, this.state.password);
            if (user.role !== 'admin') {
                throw new Error("role of the user is not admin");
            }
            setUser(user);
            this.setState({loading: false, error: null, success: true});
        } catch (e) {
            this.setState({loading: false, error: e.message});
        }
    };

    render() {

        if (this.state.success || getUser()) {
            return (
                <Redirect to='/admin'/>
            )
        }

        return (
            <div className='login-form'>

                <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
                <Grid
                    textAlign='center'
                    style={{height: '100%'}}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Admin panel
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='E-mail address'
                                    value={this.state.username}
                                    onChange={(e, {value}) => {
                                        this.setState({username: value})
                                    }}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    value={this.state.password}
                                    onChange={(e, {value}) => this.setState({password: value})}
                                />

                                <Button color='teal' fluid size='large' onClick={this.loginClicked}
                                        loading={this.state.loading}>Login</Button>
                                {this.state.error &&
                                <Segment color='red'>{this.state.error}</Segment>
                                }
                            </Segment>
                        </Form>
                        <Message>
                            <a>Remember password</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}