import { css } from "styled-components";

export const flex = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const marginTop = css`
  margin-top: 1rem;
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