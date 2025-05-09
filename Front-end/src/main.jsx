import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./i18n";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import "./i18n";
// import App from "./App.jsx";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
// } from "react-router-dom";
// import Welcome from "./components/Welcome.jsx";
// import TextCheck from "./components/TextCheck.jsx";
// import PhotoCheck from "./components/PhotoCheck.jsx";
// import LinkCheck from "./components/LinkCheck.jsx";
// import About from "./components/About.jsx";
// import Result from "./components/Result.jsx";
// import NewsHis from "./components/NewsHis";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Welcome />,
//   },
//   {
//     path: "/About",
//     element: <About />,
//   },
//   {
//     path: "/TextCheck",
//     element: <TextCheck />,
//   },
//   {
//     path: "/PhotoCheck",
//     element: <PhotoCheck />,
//   },
//   {
//     path: "/LinkCheck",
//     element: <LinkCheck />,
//   },
//   {
//     path: "/Result",
//     element: <Result />,
//   },
//   {
//     path: "/NewsHis",
//     element: <NewsHis />,
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>
// );
