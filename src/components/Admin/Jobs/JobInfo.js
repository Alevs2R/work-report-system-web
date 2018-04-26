import React, {Component} from 'react';
import {Button, Form, Header, Segment} from "semantic-ui-react";
import {createJob, getCategories, getJob, updateJob} from "../../../api/jobs";
import {Redirect} from "react-router-dom";

const MODE_EDIT = 1;
const MODE_ADD = 2;

export default class JobInfo extends Component {

    state = {
        job: {
            name: '',
            formula: '',
            units: '',
            category: '',
            description: '',
        },
        categories: [],
        loading: true,
        saved: false,
        returnToMainSelected: false,
        returnToMain: false,
        errors: {}
    };

    async loadJob(id) {
        try {
            const job = await getJob(id);
            const categories = await getCategories();
            this.setState({
                job,
                categories,
                loading: false,
            })
        } catch (e) {
            this.setState({
                mode: MODE_ADD,
                loading: false
            })
        }
    }

    async loadCategories() {
        const categories = await getCategories();
        this.setState({
            categories,
            loading: false,
        })
    }


    componentWillMount() {
        const mode = this.props.match.params.id ? MODE_EDIT : MODE_ADD;
        this.setState({
            mode
        });
        if (mode === MODE_EDIT) {
            this.loadJob(this.props.match.params.id);
        } else {
            this.loadCategories()
        }
    }

    changeName = (e) => {
        const job = {...this.state.job, name: e.target.value};
        this.setState({job});
    };

    changeDescription = (e) => {
        const job = {...this.state.job, description: e.target.value};
        this.setState({job});
    };


    changeFormula = (e) => {
        const job = {...this.state.job, formula: e.target.value};
        this.setState({job});
    };

    changeUnits = (e) => {
        const job = {...this.state.job, units: e.target.value};
        this.setState({job});
    };

    changeCategory = (e) => {
        const job = {...this.state.job, category: e.target.value};
        this.setState({job});
    };

    save = async (returnToMainSelected) => {
        this.setState({loading: true, returnToMainSelected});
        try {
            const job = {...this.state.job};
            if (this.state.mode === MODE_EDIT) {
                await updateJob(job);
            } else {
                await createJob(job);
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
                <Header as="h1">{this.state.mode === MODE_ADD ? 'Add job' : `Job: ${this.state.job.name}`}</Header>
                <Form loading={this.state.loading}>
                    <Form.Field required error={this.state.errors.name}>
                        <label>Name</label>
                        <input value={this.state.job.name} onChange={this.changeName}/>
                    </Form.Field>
                    <Form.Input value={this.state.job.category} onChange={this.changeCategory} required label="Category" list='categories' placeholder='Choose category...' />
                    <datalist id='categories'>
                        {
                            this.state.categories.map(cat => (
                                <option value={cat}>{cat}</option>
                            ))
                        }
                    </datalist>
                    <Form.Field error={this.state.errors.description}>
                        <label>Description</label>
                        <input value={this.state.job.description} onChange={this.changeDescription}/>
                    </Form.Field>
                    <Form.Input label="Unit name" placeholder="m, kg or empty" value={this.state.job.units}
                                onChange={this.changeUnits}/>
                    <Form.Input required label="Price for one" value={this.state.job.formula}
                                onChange={this.changeFormula}/>
                    {this.renderButtons()}
                    {this.state.saved &&
                    <span style={{marginLeft: '10px'}}>Saved</span>
                    }
                </Form>
                {this.state.returnToMain &&
                <Redirect to="/admin/jobs"/>
                }
            </Segment>
        );
    }
}