import React, {Component} from 'react';
import {Button, Form, Header, Segment} from "semantic-ui-react";
import {createJob, getJob, updateJob} from "../../api/jobs";
import {Redirect} from "react-router-dom";

const MODE_EDIT = 1;
const MODE_ADD = 2;

export default class JobInfo extends Component {

    state = {
        job: {
            name: '',
            formula: {
                units_enabled: false,
                price: '0',
            },
            description: '',
        },
        loading: false,
        saved: false,
        returnToMainSelected: false,
        returnToMain: false,
        errors: {}
    };

    async loadJob(id) {
        try {
            const job = await getJob(id);
            job.formula = this.parseFormula(job.formula);
            this.setState({
                job,
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
            this.loadJob(this.props.match.params.id);
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

    changeCountable = (e, {checked}) => {
        const job = {...this.state.job};
        const formula = {...job.formula};
        formula.units_enabled = checked;
        job.formula = formula;
        this.setState({job})
    };

    changePrice = (e) => {
        const job = {...this.state.job};
        const formula = {...job.formula};
        formula.price = e.target.value;
        job.formula = formula;
        console.log(job);
        this.setState({job})
    };

    changeUnitName = (e) => {
        const job = {...this.state.job};
        const formula = {...job.formula};
        formula.unit_name = e.target.value;
        job.formula = formula;
        this.setState({job})
    };

    parseFormula = (str) => {
        console.log(str);
        if (str.includes("*")) {
            const parts = str.split("*");
            const price = parts[0];
            const unit_name = parts[1].slice(1, -1);
            return {
                units_enabled: true,
                unit_name,
                price,
            }
        } else {
            return {
                units_enabled: false,
                price: str
            }
        }
    };

    encodeFormula = (data) => {
        if (data.units_enabled) {
            return `${data.price}*{${data.unit_name}}`;
        } else {
            return data.price;
        }
    };

    save = async (returnToMainSelected) => {
        this.setState({loading: true, returnToMainSelected});
        try {
            const job = {...this.state.job};
            job.formula = this.encodeFormula(job.formula);
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

    renderButtons(){
        if(this.state.mode === MODE_EDIT){
            return (
                <Button.Group>
                    <Button type="button" positive onClick={() => {this.save(true)}}>Save</Button>
                    <Button.Or />
                    <Button type="button" onClick={() => {this.save(false)}}>Save and continue</Button>
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
                <Header as="h1">{this.state.mode === MODE_ADD ? 'Add job' : 'Edit job'}</Header>
                <Form loading={this.state.loading}>
                    <Form.Field required error={this.state.errors.name}>
                        <label>Name</label>
                        <input value={this.state.job.name} onChange={this.changeName}/>
                    </Form.Field>
                    <Form.Field error={this.state.errors.description}>
                        <label>Description</label>
                        <input value={this.state.job.description} onChange={this.changeDescription}/>
                    </Form.Field>
                    <Form.Checkbox slider label='Countable' checked={this.state.job.formula.units_enabled}
                                   onChange={this.changeCountable}/>
                    {this.state.job.formula.units_enabled &&
                    <Segment>
                        <Form.Input required label="Unit name" placeholder="m, kg, etc" value={this.state.job.formula.unit_name} onChange={this.changeUnitName}/>
                        <Form.Input required label="Price for one" value={this.state.job.formula.price} onChange={this.changePrice}/>
                    </Segment>
                    }
                    {!this.state.job.formula.units_enabled &&
                    <Form.Input requiredlabel="Price" value={this.state.job.formula.price} onChange={this.changePrice}/>
                    }
                    {this.renderButtons()}
                    {this.state.saved &&
                    <span style={{marginLeft: '10px'}}>Saved</span>
                    }
                </Form>
                {this.state.returnToMain &&
                    <Redirect to="/admin/jobs" />
                }
            </Segment>
        );
    }
}