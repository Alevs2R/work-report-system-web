import React from 'react';
import {Button, Header, Icon, Loader, Message, Popup, Table} from "semantic-ui-react";
import * as api from "../../../api/brigades";
import {Link} from "react-router-dom";
import RemoveBrigadeConfirm from "./RemoveBrigadeConfirm";

export default class Brigades extends React.Component {

    state = {
        loading: true,
        error: false,
        brigades: null,
        removeBrigade: null,
    };

    async loadBrigades() {
        this.setState({
            loading: true
        });
        try {
            const brigades = await api.getBrigadesList();
            this.setState({
                loading: false,
                error: false,
                brigades
            });
        } catch (e) {
            this.setState({
                loading: false,
                error: true,
                brigades: null
            });
        }
    }

    async componentDidMount() {
        await this.loadBrigades();
    }

    removeRow = async () => {
        const id = this.state.removeBrigade.id;
        this.setState({removeBrigade: null});

        const removed = await api.deleteBrigade(id);
        if (removed) {
            this.setState({
                brigades: this.state.brigades.filter(item => item.id !== id)
            })
        }
    };


    renderItems() {
        return this.state.brigades.map(brigade => (
            <Table.Row key={brigade.id}>
                <Table.Cell>
                    <Header as='h4'>
                        <Header.Content>
                            {brigade.name}
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell>
                    {brigade.role}
                </Table.Cell>
                <Table.Cell>
                    <Link to={`${this.props.match.url}/edit/${brigade.id}`}><Button>Edit</Button></Link>
                    <Popup
                        trigger={
                            <Button icon="delete" onClick={() => this.setState({removeBrigade: brigade})}/>
                        }
                        content='Remove brigade'
                    />
                </Table.Cell>
            </Table.Row>
        ))
    }

    render() {
        return (
            <div>
                <Header as="h1">
                    Brigades
                    <Loader active={this.state.loading}/>
                    <Link to={`${this.props.match.url}/add`}><Button floated="right"><Icon name="add"/>Add brigade</Button></Link>
                </Header>
                {this.state.brigades &&
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell sorted="ascending">Brigade</Table.HeaderCell>
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
                    <Button onClick={this.loadBrigades}>Reload</Button>
                </Message>
                }
                <RemoveBrigadeConfirm brigade={this.state.removeBrigade} onCancel={() => this.setState({removeBrigade: null})}
                                   onConfirm={this.removeRow}/>
            </div>
        );
    }
}