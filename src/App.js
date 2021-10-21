// import React from "react";
import { StrictMode, useState } from "react";
import ReactDOM from "react-dom";
// import Pet from "./Pet";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SearchParams from "./searchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

/*
- Component App, which is the Parent.
- creating a react element Div and nesting the other react elements within.
- Using App and rendering it into the DOM selected by the ID of "root".
- The default way of React, the child cannot mess with the parent component
*/
// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, "Adpot Me"),
//     React.createElement(Pet, {
//       name: "Toto",
//       animal: "Dog",
//       breed: "Shih Tzu",
//     }),
//     React.createElement(Pet, {
//       name: "Lucy",
//       animal: "Dog",
//       breed: "Labrador",
//     }),
//     React.createElement(Pet, {
//       name: "Sun",
//       animal: "Cat",
//       breed: "Tabby",
//     }),
//   ]);
// };

//converting JS into JSX
const App = () => {
  const themeHook = useState("orange");
  return (
    <ThemeContext.Provider value={themeHook}>
      <div
        className="p-0 m-0"
        style={{
          background:
            "url(http://pets-images.dev-apis.com/pets/wallpaperC.jpg)",
        }}
      >
        <Router>
          <header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-purple-400 via-pink-500 to-red-500">
            <Link to="/" className="text-6xl text-white hover:text-gray-200">
              <h1>Adopt Me!</h1>
            </Link>
          </header>
          <Switch>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/">
              <SearchParams />
            </Route>
          </Switch>
        </Router>
        {/* <Pet name="Toto" animal="Dog" breed="Shih Tzu" />
        <Pet name="Lucy" animal="Dog" breed="Labrador" />
        <Pet name="Sun" animal="Cat" breed="Tabby" /> */}
      </div>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
