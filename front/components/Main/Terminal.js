import React, { Component } from 'react';
import styled from 'styled-components'

import ProgramWindow from './ProgramWindow'
import { ButtonStyle } from '../styles/ButtonStyle'


const TerminalStyle = styled.div`
  width: 50%;
  @media all and (max-width: 600px) {
    width: 100%;
  }
`

const ButtonContainer = styled.div`
  text-align: center;
`

class Terminal extends Component {
  notifications = []
  state = {
    notifications: [],
    running: false
  }

  componentDidMount() {
    this.props.socket.on('load-test', (msg) => {
      if (!this.state.running) {
        this.setState({ running: true })
      }
  
      this.notifications.push(msg)
      if (this.notifications.length > 500) {
        this.notifications = this.notifications.slice(250)
      }
    })

    this.props.socket.on('finish', (msg) => {
      this.setState({
        notifications: this.notifications,
        running: false
      })
      this.notifications = []
    })
    
    this.timer = setInterval(() => {
      if (this.state.running) {
        this.setState({
          notifications: this.notifications
        })
      }
    }, 1000);
    
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.notifications = []
    this.setState({
      notifications: []
    })
  }

  clearTerminal = () => {
    this.notifications = []
    this.setState({
      notifications: []
    })
  }

  render () {
    const { notifications } = this.state
    return (
      <TerminalStyle>
        <ProgramWindow title='Load testing output'>
          {
            notifications.map((notification, i) => <span key={i}>{notification}</span>)
          }
        </ProgramWindow>
        <ButtonContainer>
          {
            notifications.length ? 
              <ButtonStyle onClick={this.clearTerminal}>Clear</ButtonStyle>
            : <div />
          }
        </ButtonContainer>
      </TerminalStyle>
    )
  } 
};

export default Terminal