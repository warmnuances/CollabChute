import React, { useState } from 'react';
import { Menu, Segment, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import './index.scss';

function NavigationBar() {
  const [state, setState] = useState({
    activeItem: 'home'
  })

  function setItem(e, { name }){
    setState({
      ...state,
      activeItem : name
    })
  }

  const { activeItem } = state
 
  return (
    <Segment>
      <Menu className="NavigationBar" secondary>
        <span className="logo">CollabChute</span>
        <Menu.Item
          as={Link} to="/home"
          name='home'
          active={activeItem === 'home'}
          onClick={setItem}
        />
        <Menu.Item
          as={Link} to="/home"
          name='messages'
          active={activeItem === 'messages'}
          onClick={setItem}
        />
        <Menu.Item
          as={Link} to="/about"
          name='friends'
          active={activeItem === 'friends'}
          onClick={setItem}
        />
        <img src='https://api.adorable.io/avatars/40/abott@adorable.png' 
          alt="user-avatar"
          className="NavigationBar__avatar"/>
      </Menu>
    </Segment>
  )
}


export default NavigationBar
