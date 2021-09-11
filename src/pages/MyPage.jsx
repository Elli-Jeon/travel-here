import React from 'react';
import Mypage from 'components/Mypage/Mypage';


export default function MyPage(location) {

  return <Mypage user={location.location.state.user} />

}
