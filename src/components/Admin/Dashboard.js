import React from 'react';
import "./Dashboard.css";
import { Button } from 'semantic-ui-react'
import {Link} from "react-router-dom";

export default class Dashboard extends React.Component {
    render() {
        return (
            <div className="linksContainer">
                <div>
                    <div className="bigButton"><Link to={`/admin/jobs`}><Button size="massive">Jobs</Button></Link></div>
                    <div className="bigButton"><Link to={`/admin/users`}><Button size="massive">Users</Button></Link></div>
                </div>
                <div>
                    <div className="bigButton"><Link to={`/admin/reports`}><Button size="massive">Reports</Button></Link></div>
                    <div className="bigButton"><Link to={`/admin/brigades`}><Button size="massive">Brigades</Button></Link></div>
                </div>
            </div>
        );
    }
}