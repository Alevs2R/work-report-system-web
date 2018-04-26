import React, {Component} from 'react';
import {Button, Form, Header, Segment, Select} from "semantic-ui-react";
import {createUser, getUser, updateUser} from "../../../api/users";
import {Redirect} from "react-router-dom";

const MODE_EDIT = 1;
const MODE_ADD = 2;

const USER_ROLE_WORKER = 'worker';
const USER_ROLE_TASKMASTER = 'taskmaster';
const USER_ROLE_CHIEF = 'chief';
const USER_ROLE_ADMIN = 'admin';

const roles = [
    {
        value: USER_ROLE_WORKER,
        text: 'Worker',
    },
    {
        value: USER_ROLE_TASKMASTER,
        text: 'Taskmaster',
    },
    {
        value: USER_ROLE_CHIEF,
        text: 'Chief',
    },
    {
        value: USER_ROLE_ADMIN,
        text: 'Admin',
    }
];


export default class UserInfo extends Component {

    state = {
        user: {
            username: '',
            role: USER_ROLE_WORKER,
        },
        loading: false,
        saved: false,
        returnToMainSelected: false,
        returnToMain: false,
        errors: {}
    };

    async loadUser(id) {
        try {
            const user = await getUser(id);
            this.setState({
                user,
                loading: false,
            })
        } catch (e) {
            this.setState({
                mode: MODE_ADD,
                loading: false
            })
        }
    }

    componentWillMount() {
        const mode = this.props.match.params.id ? MODE_EDIT : MODE_ADD;
        this.setState({
            mode,
            loading: mode === MODE_EDIT
        });
        if (mode === MODE_EDIT) {
            this.loadUser(this.props.match.params.id);
        }
    }

    changeName = (e) => {
        const user = {...this.state.user, username: e.target.value};
        this.setState({user});
    };

    changeRole = (e,{value}) => {
        const user = {...this.state.user, role: value};
        this.setState({user});
    };

    save = async (returnToMainSelected) => {
        this.setState({loading: true, returnToMainSelected});
        try {
            const user = {...this.state.user};
            if (this.state.mode === MODE_EDIT) {
                await updateUser(user);
            } else {
                await createUser(user);
            }
            this.setState({saved: true, returnToMain: this.state.returnToMainSelected, errors: false, loading: false});
        } catch (e) {
            this.setState({
                errors: e,
                loading: false
            })
        }
    };

    renderButtons() {
        if (this.state.mode === MODE_EDIT) {
            return (
                <Button.Group>
                    <Button type="button" positive onClick={() => {
                        this.save(true)
                    }}>Save</Button>
                    <Button.Or />
                    <Button type="button" onClick={() => {
                        this.save(false)
                    }}>Save and continue</Button>
                </Button.Group>
            );
        } else {
            return (
                <Button type="button" onClick={() => {
                    this.save(true)
                }}>Save</Button>
            );
        }
    }

    render() {

        return (
            <Segment>
                <Header
                    as="h1">{this.state.mode === MODE_ADD ? 'Add user' : `User: ${this.state.user.username}`}</Header>
                <Form loading={this.state.loading}>
                    <Form.Field required error={this.state.errors.username}>
                        <label>Name</label>
                        <input value={this.state.user.username} onChange={this.changeName}/>
                    </Form.Field>

                    <Form.Select label="Role" value={this.state.user.role} onChange={this.changeRole} options={roles}/>

                    {this.renderButtons()}
                    {this.state.saved &&
                    <span style={{marginLeft: '10px'}}>Saved</span>
                    }
                </Form>
                {this.state.returnToMain &&
                <Redirect to="/admin/users"/>
                }
            </Segment>
        );
    }
}