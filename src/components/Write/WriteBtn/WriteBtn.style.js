import styled from "styled-components";

const darkBlue = "#1a46a0";

const Button = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  cursor: pointer;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  transition: 0.3s;
  background-color: ${darkBlue};
  z-index: 10;
  ::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: calc(-3rem / 2);
    margin-top: calc(-0.5rem / 2);
    width: 3rem;
    height: 0.5rem;
    background-color: black;
    border-radius: 1rem;
    transition: 0.3s;
  }
  ::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: calc(-3rem / 2);
    margin-left: calc(-0.5rem / 2);
    width: 0.5rem;
    height: 3rem;
    background-color: black;
    border-radius: 1rem;
    transition: 0.3s;
  }
  :hover {
    background-color: transparent;
    border: 0.2rem solid ${darkBlue};
    ::after {
      background-color: ${darkBlue};
    }
    ::before {
      background-color: ${darkBlue};
    }
  }
`;

const Title = styled.div`
  position: absolute;
  top: -3rem;
  right: -1.2rem;
  display: none;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 2rem;
  color: white;
  background: rgb(255,255,255,0.2);
  border-radius: 10px;
  font-size: 0.9rem;
`;

export { Title, Button };
