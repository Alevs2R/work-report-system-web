import React from 'react';
import {Button, Select, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {getUsers} from "../../../api/users";
import {addUserToBrigade} from "../../../api/brigades";

export default class WorkersList extends React.Component {

    state = {
        newWorker: null,
        loading: false,
        newUsers: [],
    };


    async loadUsers() {
        const users = (await getUsers()).filter(user => user.role === 'worker' && !this.props.workers.find(u => u.id === user.id));
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
                    {this.props.workers.map(user => (
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
                            <Select placeholder="Select worker" value={this.state.newWorker} onChange={(e, {value}) => {
                                this.setState({newWorker: value})
                            }} options={newUsers}/>
                            <div style={{display: 'inline-block', marginLeft: '10px'}}>
                                <Button disabled={!this.state.newWorker} onClick={() => {this.props.add(this.state.newWorker)}}>Add worker</Button>
                            </div>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
}
