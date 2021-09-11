// react
import React, { useEffect, useState } from "react";

// style
import GlobalStyle from "styles/GlobalStyle";
import Header from "components/Header/Header";
import { Background, Content } from "styles/Background";

// router
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import CategoryList from "pages/CategoryList";
import Board from "pages/Board/Board";
import Home from "pages/Home";
import Login from "pages/Login";
import NotFound from "pages/NotFound";
import WriteBtn from "components/Write/WriteBtn/WriteBtn";
import MyPage from "pages/MyPage";

// firebase
import { dbService } from "firebase.js";
import WriteModal from "components/Write/WriteModal/WriteModal";
import LoginFind from "pages/LoginFind";

// hook
import useAuth from "hooks/useAuth";

function App() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [isLoggedIn, userInfo] = useAuth();

  const isVisible = () => {
    setVisible(!visible);
  };

  return (
    <Background>
      <GlobalStyle />
      <BrowserRouter>
        {/* 사용자가 로그인 되었을 때*/}
        {isLoggedIn ? (
          <Header
            setActive={setActive}
            active={active}
            isLoggedIn={isLoggedIn}
          />
        ) : (
          <Header
            setActive={setActive}
            active={active}
            isLoggedIn={isLoggedIn}
          />
        )}
        <Content>
          {!isLoggedIn ? (
            // 로그인 전
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/loginhelp" component={LoginFind} />
              <Route exact path="/categorylist" component={CategoryList} />
              <Route path="/categorylist/:region" component={Board} />
              <Route component={NotFound} />
            </Switch>
          ) : (
            // 로그인 후
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/categorylist" component={CategoryList} />
              <Route path="/categorylist/:region" component={Board} />
              <Route exact path="/mypage" component={MyPage} />
              <Route component={NotFound} />
            </Switch>
          )}
        </Content>
        <Link to="/categorylist/:region" />
        {isLoggedIn && (
          <>
            <WriteBtn isVisible={isVisible} />
            <WriteModal visible={visible} isVisible={isVisible} />
          </>
        )}
      </BrowserRouter>
    </Background>
  );
}

export default App;
