import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Category() {
  return (
    <List>
      <SLink to={"/cuisine/Italian"}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </SLink>
      <SLink to={"/cuisine/American"}>
        <FaHamburger />
        <h4>American</h4>
      </SLink>
      <SLink to={"/cuisine/Thai"}>
        <GiNoodles />
        <h4>Thai</h4>
      </SLink>
      <SLink to={"/cuisine/Japanese"}>
        <GiChopsticks />
        <h4>Japanese</h4>
      </SLink>
    </List>
  );
}

const List = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #f7f7f7;
  border-radius: 12px
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  max-width: 80%
`;

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin: 0;
  padding: 0.5rem;
  text-decoration: none;
  background: #ffffff;
  width: 7rem;
  height: 7rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  h4 {
    color: #313131;
    font-size: 0.9rem
    margin-top: 0.3rem;
  }

  svg {
    color: #313131;
    font-size: 2rem;
  }
  &:hover{
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  
  &.active {
    background: linear-gradient(to right, #ff7e5f, #feb47b);
    svg {
      color: white;
    }
    h4 {
      color: white;
    }
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
  }
`;

export default Category;
