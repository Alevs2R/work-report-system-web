import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const RemoveConfirm = (props) => (
    <Modal basic size='small' open={props.entity !== null}>
        <Header icon='delete' content={`Delete ${props.entityName}`} />
        <Modal.Content>
            <p>{`Do you want to remove ${props.entityName} "${props.entity ? props.entity.name : ''}"?`}</p>
        </Modal.Content>
        <Modal.Actions>
            <Button basic color='red' inverted onClick={props.onCancel}>
                <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted onClick={props.onConfirm}>
                <Icon name='checkmark' /> Yes
            </Button>
        </Modal.Actions>
    </Modal>
);

export default RemoveConfirm;