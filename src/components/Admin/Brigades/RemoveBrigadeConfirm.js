import React from 'react'
import RemoveConfirm from "../RemoveConfirm";

const RemoveBrigadeConfirm = (props) => (
    <RemoveConfirm entityName="brigade" entity={props.brigade} onConfirm={props.onConfirm} onCancel={props.onCancel} />
);

export default RemoveBrigadeConfirm;