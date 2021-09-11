import styled from 'styled-components'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const StyledSlider = styled(Slider)`
  width : 100%;
  height : 25rem;
  .slick-list {
    width : 100%;
    height : 100%;
  }
  .slick-track{
    width : 100%;
    height : 100%;
    display: flex;
    flex-direction: row;
  }
  .slick-slide {
    img {
      width: 100%;
      height : 25rem;
      object-fit: cover;
    }
  }
  .slick-prev {
    left : -10px;
    z-index : 10;
  }
  .slick-next {
    right : 10px;
    z-index : 10;
  }
  .slick-prev::before, .slick-next::before {
    position : absolute;
    top : 0;
    bottom : 0;
    color: lightgray;
    border-radius: 50%;
  }
  p {
    right: 0;
  }
`;

const Li = styled.li`
  position: relative;
`;

const Div = styled.div`
  p {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    /* opacity: 1; */
    p{
      transform: translate(-0.5rem, 2rem);
      color: white;
      z-index: 20;
      background: rgb(0,0,0,0.5);
      color: white;
      border-radius: 5px;
      padding: 0.2rem 0.5rem;
    }
  }
`;

export {
  Li,
  Div,
  StyledSlider,
}