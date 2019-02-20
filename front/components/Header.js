import styled from 'styled-components'

const HeaderStyle = styled.div`
  text-align: center;
  img {
    padding-top: 20px;
    width: 250px;
  }
`

const Header = () => (
  <HeaderStyle>
    <img src="/static/logo.png" alt="easygraphql logo" />
  </HeaderStyle>
)

export default Header