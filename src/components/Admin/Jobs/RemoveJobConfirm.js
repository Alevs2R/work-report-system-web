import React from 'react'
import RemoveConfirm from "../RemoveConfirm";

const RemoveJobConfirm = (props) => (
    <RemoveConfirm entityName="job" entity={props.job} onConfirm={props.onConfirm} onCancel={props.onCancel} />
);

export default RemoveJobConfirm;