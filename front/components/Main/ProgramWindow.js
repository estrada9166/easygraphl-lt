import React, { Component } from 'react'
import styled from 'styled-components'

const Window = styled.div`
  max-width: 700px;
  margin: 0em auto 1em;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 1px 20px 0px rgba(66, 66, 66, 0.13);
  box-shadow: 0 2px 42px 0px rgba(30, 112, 167, 0.39);
  background-color: #121212;
`

const Bar = styled.div`
  background: #f9f9f9;
  border-bottom: 1px solid #ebebeb;
  height: 40px;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 0.8em;
  text-align: center;
`

const Content = styled.div`
  height: 500px;
  padding: 0 10px;
  min-height: 150px;
  white-space: pre-wrap;
  color: green;
  font-size: 0.6em;
  overflow-y: scroll;
`

class ProgramWindow extends Component {
  componentDidMount () {
    this.scrollToBottom()
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  scrollToBottom () {
    this.el.scrollIntoView()
  }

  render () {
    return (
      <Window>
        <Bar>{this.props.title || ''}</Bar>
        <Content>
          {this.props.children}
          <div ref={el => { this.el = el }} />
        </Content>
      </Window>
    )
  }
}

export default ProgramWindow
