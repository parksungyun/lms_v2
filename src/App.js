import { createGlobalStyle } from 'styled-components';
import { Router } from './pages/Router';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Pretendard-Regular;
  }
`;

export default function App() {

  return <>
    <GlobalStyle />
    <Router />
  </>
}