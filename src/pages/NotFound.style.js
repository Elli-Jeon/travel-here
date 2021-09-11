import styled from "styled-components";

const blue = "#409BF0";

const Container = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  caret-color: transparent;
  section {
    width: 40rem;
    height: 20rem;
    background: rgb(0,0,0,0.5);
    box-shadow: 0 0 4px ${blue};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    h1 {
      font-size: 8rem;
      padding: 2rem 1rem;
      border-right: 1px solid darkgray;
    }
    div {
      padding: 1rem;
      transform: translateY(0.5rem);
      h2 {
        font-size: 2rem;
      }
      p {
        margin: 0.8rem 0;
      }
      button {
        font-size: 1rem;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        border: 1px solid ${blue};
        background-color: ${blue};
        transition: all 200ms ease-in-out;
      }
      button:hover {
        cursor: pointer;
        background: transparent;
        color: ${blue};
      }
    }
  }
`;

export {
  Container
}