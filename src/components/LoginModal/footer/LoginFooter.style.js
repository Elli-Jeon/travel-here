import styled from 'styled-components';

const Footer = styled.footer`
  height: 100%;
  ul {
    position: relative;
    display: flex;
    justify-content: space-around;
    transform: translateY(300px);

    li {
      button {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: transparent;
        cursor: pointer;
        width: 100%;
        span {
          font-size: 32px;
        }
        p {
          display: inline-block;
        }
      }
    }
  }
  .closeBtn {
    position: absolute;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 24px;
    top: 1em;
    left: 1em;
  }
`;

export { Footer };
