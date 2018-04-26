import React from 'react'
import RemoveConfirm from "../RemoveConfirm";

const RemoveUserConfirm = (props) => (
    <RemoveConfirm entityName="user" entity={props.user?{name: props.user.username}:null} onConfirm={props.onConfirm} onCancel={props.onCancel} />
);

export default RemoveUserConfirm;