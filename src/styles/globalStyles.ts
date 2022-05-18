import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
    font-family: Poppins, -apple-system, "Roboto", sans-serif;
    box-sizing: border-box;
    outline: none;
    text-decoration: none;
}

html {
    scroll-behavior: smooth;
}

body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
}

button, input[type="checkbox"] {
    cursor: pointer;
}

button, input, textarea {
    :disabled{
      cursor: not-allowed;
    }
}

button, input, textarea{
    border: none;
    background: none;
    outline: none;
}

ul {
    list-style: none;
}

@media (min-width: 1350px) {
    html {
        font-size: 100%;
    }
}

@media (min-width: 1200px) and (max-width: 1349px) {
    html {
        font-size: 90%;
    }
}

@media (min-width: 992px) and (max-width: 1199px) {
    html {
        font-size: 80%;
    }
}

@media (max-width: 991px) {
    html {
        font-size: 70%;
    }
}
`;
