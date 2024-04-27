import Pages from "./pages/Pages";
import Category from "./componenets/category";
import { BrowserRouter, Link } from "react-router-dom";
import Search from "./componenets/search";
import styled from "styled-components";
import { GiKnifeFork } from "react-icons/gi";
import MyComponent from "./componenets/myComponent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyComponent />
        <Nav>
          <GiKnifeFork />
          <Logo to={"/"}> BegoCooks</Logo>
        </Nav>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: 700;
  font-family: "Lobstor Two", cursive;
  color: #333


&:hover{
  color: #ff7e5f
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1)
}

`;
const Nav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f7f7f7;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  svg {
    font-size: 2rem;
    margin-right: 1rem;
    color: #333;
    transition: color 0.2s ease;

    &:hover {
      color: #ff7e5f;
    }
  }
`;

export default App;
