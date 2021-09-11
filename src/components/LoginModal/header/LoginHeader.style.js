import styled from 'styled-components';

const white = "#fff";
const pink = "#ff73b3";


const Header = styled.header`
  height: 100%;
  .table {
    display: table;
    width: 100%;
    height: 100%;
  }

  .table-cell {
    display: table-cell;
    vertical-align: middle;
    transition: all 0.5s;
    text-align: center;
  }

  .container {
    position: relative;
    width: 600px;
    margin: 30px auto 0;
    height: 320px;
    background-color: #999ede;
    top: 50%;
    margin-top: -160px;
    transition: all 0.5s;
  }
  .container .box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .container .box:before,
  .container .box:after {
    content: ' ';
    position: absolute;
    left: 152px;
    top: 50px;
    background-color: #9297e0;
    transform: rotateX(52deg) rotateY(15deg) rotateZ(-38deg);
    width: 300px;
    height: 285px;
    transition: all 0.5s;
  }
  .container .box:after {
    background-color: #a5aae4;
    top: -10px;
    left: 80px;
    width: 320px;
    height: 180px;
  }
  .container .container-forms {
    position: relative;
  }
  .container .btn {
    cursor: pointer;
    text-align: center;
    margin: 0 auto;
    width: 60px;
    color: ${white};
    background-color: ${pink};
    opacity: 1;
    transition: all 0.5s;
  }

  .container .btn:hover {
    opacity: 0.7;
  }
  .container .btn,
  .container input {
    padding: 10px 15px;
  }
  .container input {
    margin: 0 auto 15px;
    display: block;
    width: 220px;
    transition: all 0.3s;
  }
  .container .container-forms .container-info {
    text-align: left;
    font-size: 0;
  }
  .container .container-forms .container-info .info-item {
    text-align: center;
    font-size: 16px;
    width: 300px;
    height: 320px;
    display: inline-block;
    vertical-align: top;
    color: ${white};
    opacity: 1;
    transition: all 0.3s;
  }
  .container .container-forms .container-info .info-item p {
    font-size: 20px;
    margin: 20px;
  }
  .container .container-forms .container-info .info-item .btn {
    background-color: transparent;
    border: 1px solid ${white};
    padding: 12px 6px;
  }
  .container .container-forms .container-info .info-item .table-cell {
    padding-right: 35px;
  }
  .container
    .container-forms
    .container-info
    .info-item:nth-child(2)
    .table-cell {
    padding-left: 35px;
    padding-right: 0;
  }
  .container .container-form {
    overflow: hidden;
    position: absolute;
    left: 30px;
    top: -30px;
    width: 305px;
    height: 380px;
    background-color: ${white};
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.5s;
  }
  .container .container-form:before {
    content: '✔';
    position: absolute;
    left: 160px;
    top: -50px;
    color: #5356ad;
    font-size: 130px;
    opacity: 0;
    transition: all 0.5s;
  }
  .container .container-form .btn {
    position: relative;
    box-shadow: 0 0 10px 1px ${pink};
    margin-top: 13px;
    width: 70%;
    border-radius: 12px;
  }
  .container .container-form .findPassword {
    position: relative;
    cursor: pointer;
    text-align: end;
    background-color: transparent;
    font-size: 10px;
    width: 70%;
    border: none;
  }
  .container .form-item {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    transition: all 0.5s;
  }
  .container .form-item.sign-up {
    position: absolute;
    left: -100%;
    opacity: 0;
  }
  .container.log-in .box:before {
    position: absolute;
    left: 180px;
    top: 62px;
    height: 265px;
  }
  .container.log-in .box:after {
    top: 22px;
    left: 192px;
    width: 324px;
    height: 220px;
  }
  .container.log-in .container-form {
    left: 265px;
  }
  .container.log-in .container-form .form-item.sign-up {
    left: 0;
    opacity: 1;
  }
  .container.log-in .container-form .form-item.log-in {
    left: -100%;
    opacity: 0;
  }
`;

export { Header };
