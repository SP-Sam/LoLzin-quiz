import styled from 'styled-components'

export const Widget = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => {
    return theme.colors.mainBg;
  }};
  border-radius: 5px;
  overflow: hidden;
  h1, h2, h3 {
    font-size: 18px;
    font-weight: 700;
    line-height: 0.7em;
  }
  p {
    font-size: 15px;
    font-weight: 400;
    line-height: 0.95em;
  }
`

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};
  
  * {
    margin: 0;
  }
`

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`

export default Widget;