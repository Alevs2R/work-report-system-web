import React, {Component} from 'react';
import {Button, Form, Header, Segment} from "semantic-ui-react";
import {addUserToBrigade, createBrigade, getBrigade, removeUserFromBrigade, updateBrigade} from "../../../api/brigades";
import {Redirect} from "react-router-dom";
import WorkersList from "./WorkersList";
import TaskmastersList from "./TaskmastersList";

const MODE_EDIT = 1;
const MODE_ADD = 2;

export default class BrigadeInfo extends Component {

    state = {
        brigade: {
            name: '',
            workers: [],
            taskmasters: [],
        },
        loading: false,
        saved: false,
        returnToMainSelected: false,
        returnToMain: false,
        errors: {}
    };

    async loadBrigade(id) {
        this.setState({
            loading: true
        });
        try {
            const brigade = await getBrigade(id);
            this.setState({
                brigade,
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
            this.loadBrigade(this.props.match.params.id);
        }
    }

    changeName = (e) => {
        const brigade = {...this.state.brigade, name: e.target.value};
        this.setState({brigade});
    };

    save = async (returnToMainSelected) => {
        this.setState({loading: true, returnToMainSelected});
        try {
            const brigade = {...this.state.brigade};
            if (this.state.mode === MODE_EDIT) {
                await updateBrigade(brigade);
            } else {
                this.setState({brigade: await createBrigade(brigade)});
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

    addUser = async (id) => {
        await addUserToBrigade(this.state.brigade.id, id);
        this.loadBrigade(this.state.brigade.id);
    };

    removeUser = async (id) => {
        await removeUserFromBrigade(this.state.brigade.id, id);
        this.loadBrigade(this.state.brigade.id);
    };

    render() {
        return (
            <Segment style={{marginBottom: '40px'}}>
                <Header as="h1">{this.state.mode === MODE_ADD ? 'Add brigade' : 'Edit brigade'}</Header>
                <Form loading={this.state.loading}>
                    <Form.Field required error={this.state.errors.name}>
                        <label>Name</label>
                        <input value={this.state.brigade.name} onChange={this.changeName}/>
                    </Form.Field>
                    {this.renderButtons()}
                    {this.state.saved &&
                    <span style={{marginLeft: '10px'}}>Saved</span>
                    }
                    <Header>Workers</Header>
                    <WorkersList add={this.addUser} remove={this.removeUser} workers={this.state.brigade.workers}/>
                    <Header>Taskmasters</Header>
                    <TaskmastersList add={this.addUser} remove={this.removeUser} taskmasters={this.state.brigade.taskmasters}/>
                </Form>
                {this.state.returnToMain &&
                <Redirect to="/admin/brigades"/>
                }
            </Segment>
        );
    }
}