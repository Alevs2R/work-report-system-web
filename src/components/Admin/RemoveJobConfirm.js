import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const RemoveJobConfirm = (props) => (
    <Modal basic size='small' open={props.job !== null}>
        <Header icon='delete' content={"Delete job"} />
        <Modal.Content>
            <p>{`Do you want to remove job "${props.job ? props.job.name : ''}"?`}</p>
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

export default RemoveJobConfirm;