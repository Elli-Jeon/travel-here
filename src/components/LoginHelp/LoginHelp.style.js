import styled from 'styled-components';

const pink = "#ff73b3";

const LoginBg = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
`;

const Logincontainer = styled.div`
  width: 480px;
  height: 400px;
  background-color: #fffaf0;
  position: relative;
  margin: 50px auto;
  padding: 20px;
  z-index: 100;
  padding: 60px 68px 40px 68px;
  @media screen and (max-width: 740px) {
    width: 100vw;
    margin: 0;
    height: 100vh;
    padding: 1em;
  }
`;

const Header = styled.header`
  text-align: center;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 40px 0;
    li {
      width: 100%;
      h1 {
        font-size: 34px;
        transform: translateY(-100%);
      }
      .inputEmail {
        display: block;
        width: 100%;
        padding: 8px;
        height: 2rem;
        border-radius: 12px;
        outline: none;
      }
      .sendEmailBtn {
        border: none;
        width: 100%;
        height: 3rem;
        border-radius: 12px;
        color: #fff;
        background-color: ${pink};
        cursor: pointer;
        font-size: 18px;
        margin-top: 1rem;
        box-shadow: 0 0 10px 1px ${pink};
      }
    }
  }
`;

const BackBtn = styled.button`
  position: absolute;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 24px;
  top: 1em;
  left: 1em;
`;
export { Header, Logincontainer, LoginBg, BackBtn };
