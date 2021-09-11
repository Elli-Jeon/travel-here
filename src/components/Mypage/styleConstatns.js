import { css } from "styled-components";

export const flex = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const frame = css`
  background-color: rgb(255,255,255,0.1);
  color: white;
  width: 15rem;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  cursor: pointer;
`;

export const marginTop = css`
  margin-top: 1rem;
`;

export const fontSize = css`
  font-size: 1.5rem;
`;

export const hideScrollbar = css`
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const cursorPointer = css`
  :hover {
    cursor: pointer;
  }
`;