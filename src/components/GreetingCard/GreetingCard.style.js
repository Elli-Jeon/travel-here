import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  margin-top: calc(-286px / 2);
`;

const H2 = styled.h2`
  font-weight: 700;
  font-size: 250px;
  color: white;
  text-align: center;
  caret-color: transparent;
  @media screen and (max-width: 900px) {
    font-size: 150px;
  }
  @media screen and (max-width: 550px) {
    font-size: 100px;
  }
`;

const P = styled.p`
  font-size: 36px;
  font-weight: 700;
  color: white;
  text-align: center;
  caret-color: transparent;
  margin-top: 4rem;
  @media screen and (max-width: 900px) {
    margin-top: 3rem;
    font-size: 20px;
  }
  @media screen and (max-width: 550px) {
    margin-top: 2rem;
  }
`;

export { Container, H2, P };
