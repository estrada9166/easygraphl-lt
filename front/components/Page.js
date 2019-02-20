import Meta from './Meta'
import Header from './Header'
import styled from 'styled-components'

const Inner = styled.div`
  margin: 0 20px;
  padding: 0 1rem;
  @media all and (max-width: 600px) {
    margin: 0;
  }
`;

const Page = (props) => (
  <div>
    <Meta />
    <Header />
    <Inner>{props.children}</Inner>
    <style global jsx>{`
      body {
        background-color: #fafafa;
        font-size: 1.5rem;
        font-family: 'Avenir Next', sans-serif;
      }
    `}</style>
  </div>
)

export default Page
