import { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch></FaSearch>
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
        />
      </div>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  display: flex;
  aligin-items: center;
  justify-content: center;
  margin: 0 10%;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #f7f7f7;
  div {
    position: relative;
    width: 100%;
  }

  input {
    width: 100%;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: 1rem;
    color: #333;
    outline: none;
    transition: border-color 0.2s ease;
    &:hover,
    &:focus {
      border-color: #0072ff;
    }
  }

  svg {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    transform: translate(-50%);
    color: #666;
    font-size: 1.5rem;
  }
`;

export default Search;
