import React from 'react';
import {Button, Header, Icon, Loader, Message, Popup, Table} from "semantic-ui-react";
import {getUsers} from "../../../api/users";
import {Link} from "react-router-dom";
import RemoveUserConfirm from "./RemoveUserConfirm";
import * as api from "../../../api/users";

export default class Users extends React.Component {

    state = {
        loading: true,
        error: false,
        users: null,
        removeUser: null,
    };

    async loadUsers() {
        this.setState({
            loading: true
        });
        try {
            const users = await getUsers();
            this.setState({
                loading: false,
                error: false,
                users
            });
        } catch (e) {
            this.setState({
                loading: false,
                error: true,
                users: null
            });
        }
    }

    async componentDidMount() {
        await this.loadUsers();
    }

    removeRow = async () => {
        const id = this.state.removeUser.id;
        this.setState({removeUser: null});

        const removed = await api.deleteUser(id);
        if (removed) {
            this.setState({
                users: this.state.users.filter(item => item.id !== id)
            })
        }
    };


    renderItems() {
        return this.state.users.map(user => (
            <Table.Row key={user.id}>
                <Table.Cell>
                    <Header as='h4'>
                        <Header.Content>
                            {user.username}
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell>
                    {user.role}
                </Table.Cell>
                <Table.Cell>
                    <Link to={`${this.props.match.url}/edit/${user.id}`}><Button>Edit</Button></Link>
                    <Popup
                        trigger={
                            <Button icon="delete" onClick={() => this.setState({removeUser: user})}/>
                        }
                        content='Remove user'
                    />
                </Table.Cell>
            </Table.Row>
        ))
    }

    render() {
        return (
            <div>
                <Header as="h1">
                    Users
                    <Loader active={this.state.loading}/>
                    <Link to={`${this.props.match.url}/add`}><Button floated="right"><Icon name="add"/>Add user</Button></Link>
                </Header>
                {this.state.users &&
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell sorted="ascending">User</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.renderItems()}
                    </Table.Body>
                </Table>
                }
                {this.state.errors &&
                <Message>
                    <Message.Header>
                        An error occured
                    </Message.Header>
                    <Button onClick={this.loadUsers}>Reload</Button>
                </Message>
                }
                <RemoveUserConfirm user={this.state.removeUser} onCancel={() => this.setState({removeUser: null})}
                                  onConfirm={this.removeRow}/>
            </div>
        );
    }
}