import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import config from "../config";

function Search() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Make a GET request to the backend server with the search query
      const response = await axios.get(
        `${config.apiBaseUrl}/api/recipes/search`,
        {
          params: {
            query: input,
          },
        }
      );

      // Navigate to the search results page with the search results
      navigate("/searched", {
        state: { results: response.data },
      });
    } catch (error) {
      console.error("Search error:", error);
      setError(error);
    }

    setLoading(false);
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for recipes..."
          required
        />
      </div>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  display: flex;
  align-items: center;
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
    transform: translateY(-50%);
    color: #666;
    font-size: 1.5rem;
  }
`;

export default Search;
