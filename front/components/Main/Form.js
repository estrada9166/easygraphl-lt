import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios'

import { ButtonStyle } from '../styles/ButtonStyle'

import { SERVER_URL } from '../../constants'

const FormStyle = styled.div`
  width: 50%;
  text-align: center;
  margin: auto;
  @media all and (max-width: 600px) {
    width: 100%;
  }
`

const InputContainer = styled.div`
  margin: 20px;
`

const InputStyle = styled.input`
  text-align: center;  
  margin: 10px 5px 5px 5px;
  padding: 0 5px;
  width: ${props => props.width ? props.width : '42%'};
  border: none;
  background-color: #FFFCFC;
  outline: none;
  border-bottom: 1px dotted #00083266;
  @media all and (max-width: 600px) {
    width: 80%;
  }
`

const TextStyle = styled.textarea`
  margin-top: 10px;
  padding: 0 5px;
  width: ${props => props.width ? props.width : '42%'};
  background-color: #FFFCFC;
  outline: none;
  border: 1px dotted #00083266;
  @media all and (max-width: 600px) {
    width: 80%;
  }
`

const ErrorTitleStyle = styled.span`
  color: red;
  font-weight: 500;
`

class Form extends Component {
  state = { 
    url: '',
    duration: 5,
    arrivalRate: 10,
    args: '',
    buttonDisabled: false,
    error: ''
  };

  componentDidMount() {
    this.props.socket.on('load-test', (msg) => {
      this.setState({
        error: ''
      })
    })
    this.props.socket.on('finish', (msg) => {
      this.setState({
        buttonDisabled: false
      })
    })
    this.props.socket.on('load-tester-error', (msg) => {
      this.setState({
        error: msg
      })
    })
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  start = async e => {
    try {
      e.preventDefault();
      let { url, duration, arrivalRate, args } = this.state
      let queryArguments 

      if (!url) {
        throw new Error('URL is missing')
      }

      if (!duration) {
        duration = 5
      }

      if (!arrivalRate) {
        arrivalRate = 10
      }

      if (args) {
        const validArgs = JSON.parse(args)
        queryArguments = JSON.stringify(validArgs)
      }
  
      await axios.post(`${SERVER_URL}/api`, {
        url,
        duration,
        arrivalRate,
        queryArguments
      })
  
      this.setState({ buttonDisabled: true })
    } catch (err) {
      if (err.message.includes('JSON')) {
        this.setState({
          error: 'Invalid JSON arguments'
        })
      } else {
        this.setState({
          error: err.message
        })
      }
    }
  }

  render() {
    return (
      <FormStyle>
        <form>
          <InputContainer>
            <InputStyle 
              onChange={this.handleChange}
              type='text'
              required
              id="url"
              name="url"
              placeholder='Server URL'
            />
          </InputContainer>
          <InputContainer>
            <InputStyle 
              width='20%'
              onChange={this.handleChange}
              type='number'
              id="duration"
              name="duration"
              placeholder='Set duration'
            />
            <InputStyle 
              width='20%'
              onChange={this.handleChange}
              type='number'
              id="arrivalRate"
              name="arrivalRate"
              placeholder='Set arrival rate'
            />
          </InputContainer>
          <InputContainer>
            <TextStyle 
              rows='10' 
              cols='50' 
              onChange={this.handleChange}
              id="args"
              name="args"
              placeholder='Query arguments (JSON)'
            />
          </InputContainer>
          <InputContainer>
            <ButtonStyle id='sendButton' onClick={this.start} disabled={this.state.buttonDisabled}>Send</ButtonStyle>
          </InputContainer>
        </form>
        {
          this.state.error ? 
            <ErrorTitleStyle id='errorMessage'>{this.state.error}</ErrorTitleStyle>
          : <div />
        }
      </FormStyle>
    )
  }
}

export default Form
