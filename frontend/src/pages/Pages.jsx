import React from "react";
import Home from "./home";
import { Route, Routes } from "react-router-dom";
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import Recipe from "./Recipe";
import MyComponent from "./componenets/MyComponent";

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cuisine/:type" element={<Cuisine />} />
      <Route path="/searched/:search" element={<Searched />} />
      <Route path="/recipe/:name" element={<Recipe />} />
      <Route path="/my-component" element={<MyComponent />} />
    </Routes>
  );
}

export default Pages;
