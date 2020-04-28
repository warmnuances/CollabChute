import React from 'react'
import { Button, Header, Container, Icon, Input, Message, Segment } from 'semantic-ui-react'

function Form() {
    return (
        <Container text textAlign='center' style={{ margin: 50,position: 'absolute', left: '50%', top: '40%',transform: 'translate(-50%, -50%)'}}>
            <Segment compact="true" textAlign="center" padded='very' color='black' style={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)'}}>
            <Header as="h1" icon>
            <Icon name='settings' />
            CollabChute
            <Header.Subheader>
            Assemble Project Easier
            </Header.Subheader>
            </Header>
            <Input color="black" icon='users' iconPosition='left' placeholder='User Name' /><br/>
            <Input icon='lock' iconPosition='left' placeholder='Password' /><br/><br/>
                <Button basic color='black' animated="fade">
                <Button.Content visible>
                    <Icon size="big" name="plus" />
                </Button.Content>
                <Button.Content hidden>Sign Up</Button.Content>
                </Button>
                <Button basic color='black' animated="fade">
                <Button.Content visible>
                    <Icon size="big" name="sign-in" />
                </Button.Content>
                <Button.Content hidden>Enter</Button.Content>
                </Button>
            </Segment>
        </Container>
    )
}

export default Form
