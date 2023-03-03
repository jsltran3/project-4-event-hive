import React from "react";
import ReactDOM from "react-dom";
// Suggestion From Related GitHub Issues Page:
// https://github.com/facebook/react/issues/18866
// import ReactDOM from "react-dom/client";
import App from "./App";
// import { BrowserRouter } from "react-router-dom";
import {  BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *,
  *::before, 
  *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
  }

  body {
    font-family: BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
  }
`;

// This is the 'Login' lab's approach on how to handle routing:
ReactDOM.render(
  <BrowserRouter>
    <GlobalStyle />
    <App
     />
  </BrowserRouter>,
  document.getElementById("root")
);

// Another Attempt To Avoid Nested Browser Routes Which Did Not Work:
// ReactDOM.render(
//   <React.StrictMode>
//     <GlobalStyle />
//     <App />
//   </React.StrictMode>
//   document.getElementById("root")
// );

// This is the routing that worked for me for the Phase 3 project:
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/*" element={<App />} />
//     </Routes>
// </BrowserRouter>
// );
