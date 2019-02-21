import styled from 'styled-components'
import openSocket from 'socket.io-client'

import Form from './Form'
import Terminal from './Terminal'

import { SERVER_URL } from '../../constants'

const socket = openSocket(SERVER_URL)

const MainStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
`

const Main = () => (
  <MainStyle>
    <Form socket={socket} />
    <Terminal socket={socket} />
  </MainStyle>
)

export default Main
