import styled from 'styled-components'

export const ButtonStyle = styled.button`
  height: 40px;
  width: 180px;
  background-color: ${props => props.color ? props.color : '#000832'};
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 4px 2px;
  cursor: pointer;
  :disabled {
    background-color: #cccccc;
  }
`
