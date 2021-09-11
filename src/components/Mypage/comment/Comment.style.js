import styled from "styled-components";
import { frame } from "../styleConstatns";

const List = styled.li`
  p {
    ${frame};
  }
`;

const Null = styled.p`
  ${frame};
  cursor: auto;
`;

export { List, Null };
