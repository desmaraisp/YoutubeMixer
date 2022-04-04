import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
::-webkit-scrollbar {
    background-color: #202324;
    color: #aba499;
}
::-webkit-scrollbar-thumb {
    background-color: #454a4d;
}
::-webkit-scrollbar-corner {
    background-color: #181a1b;
}

input,
button {
    background-color:inherit;
    color:inherit;
}

button:disabled{
   cursor: not-allowed;
}

button {
    cursor: pointer;
}

body {
    background-color: #181a1b;
    border-color: rgb(115, 107, 94);
    color: rgb(232, 230, 227);
}

html, body, #root {
  height: 100%;
}
`;