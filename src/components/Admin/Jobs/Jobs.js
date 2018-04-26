import React from 'react';
import {Button, Header, Loader, Message, Popup, Table, Icon} from "semantic-ui-react";
import * as api from "../../../api/jobs";
import {Link} from "react-router-dom";
import RemoveJobConfirm from "./RemoveJobConfirm";

export default class Jobs extends React.Component {

    state = {
        loading: true,
        error: false,
        jobs: null,
        removeJob: null,
    };

    async loadJobs() {
        this.setState({
            loading: true
        });
        try {
            const jobs = (await api.getJobsList()).sort((a,b) => a.category.localeCompare(b.category));
            this.setState({
                loading: false,
                error: false,
                jobs
            });
        } catch (e) {
            this.setState({
                loading: false,
                error: true,
                jobs: null
            });
        }
    }

    async componentDidMount() {
        await this.loadJobs();
    }

    removeRow = async () => {
        const id = this.state.removeJob.id;
        this.setState({removeJob: null});

        const removed = await api.deleteJob(id);
        if (removed) {
            this.setState({
                jobs: this.state.jobs.filter(item => item.id !== id)
            })
        }
    };

    renderCategoryRow(category){
        return (
            <Table.Row key={category} active>
                <Table.Cell colSpan="2">
                    <Header as='h4'>
                        <Header.Content>
                            {category}
                        </Header.Content>
                    </Header>
                </Table.Cell>
            </Table.Row>
        );
    }

    renderItems() {
        const items = [];
        let lastCategory = null;

        for(let job of this.state.jobs){
            if(job.category !== lastCategory){
                lastCategory = job.category;
                items.push(this.renderCategoryRow(lastCategory));
            }
            items.push(
                <Table.Row key={job.id}>
                    <Table.Cell>
                        <Header as='h4'>
                            <Header.Content>
                                {job.name}
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                        <Link to={`${this.props.match.url}/edit/${job.id}`}><Button>Edit</Button></Link>
                        <Popup
                            trigger={
                                <Button icon="delete" onClick={() => this.setState({removeJob: job})}/>
                            }
                            content='Remove job'
                        />
                    </Table.Cell>
                </Table.Row>
            )
        }
        return items;
    }

    render() {
        return (
            <div>
                <Header as="h1">
                    Jobs
                    <Loader active={this.state.loading}/>
                    <Link to={`${this.props.match.url}/add`}><Button floated="right"><Icon name="add"/>Add job</Button></Link>
                </Header>
                {this.state.jobs &&
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Job name</Table.HeaderCell>
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
                    <Button onClick={this.loadJobs}>Reload</Button>
                </Message>
                }
                <RemoveJobConfirm job={this.state.removeJob} onCancel={() => this.setState({removeJob: null})}
                                  onConfirm={this.removeRow}/>
            </div>
        );
    };
}