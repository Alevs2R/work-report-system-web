import React from 'react';
import {Button, Select, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {getUsers} from "../../../api/users";

export default class TaskmastersList extends React.Component {

    state = {
        newTaskmaster: null,
        loading: false,
        newUsers: [],
    };


    async loadUsers() {
        const users = (await getUsers()).filter(user => user.role === 'taskmaster' && !this.props.taskmasters.find(u => u.id === user.id));
        this.setState({
            newUsers: users
        });
    }

    componentDidMount() {
        this.loadUsers();
    }

    componentWillReceiveProps() {
        this.loadUsers();
    }

    render() {

        const newUsers = this.state.newUsers.map(el => ({value: el.id, text: el.username}));

        return (
            <Table celled>
                <Table.Body>
                    {this.props.taskmasters.map(user => (
                        <Table.Row>
                            <Table.Cell>
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <Link to={`/admin/users/edit/${user.id}`}>
                                        {user.username}
                                    </Link>
                                    <Button onClick={() => {this.props.remove(user.id)}} icon="remove"/>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Select placeholder="Select taskmaster" value={this.state.newTaskmaster} onChange={(e, {value}) => {
                                this.setState({newTaskmaster: value})
                            }} options={newUsers}/>
                            <div style={{display: 'inline-block', marginLeft: '10px'}}>
                                <Button disabled={!this.state.newTaskmaster} onClick={() => {this.props.add(this.state.newTaskmaster)}}>Add taskmaster</Button>
                            </div>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
}
