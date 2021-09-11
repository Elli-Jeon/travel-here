import React, {useState, useEffect, useRef} from 'react'
import { storageService } from 'firebase.js';
import ImageLoader from './ContentPlaceholder';
import * as S from './PostSlider.style'

const PostSlider = ({postImages}) => {

  const img = useRef();
  const count = useRef();
  
  // post에 저장되어있던 image들의 url을 저장
  const [imageURL, setImageURL] = useState([]);
  const [sliderReady, setSliderReady] = useState(false);
  let [num, setNum] = useState('');

  useEffect(()=>{
    // 현재 post가 가지고 있는 것들을 url로 받아옴
    const imageURLCheck = async () => {
      const result = []
      for(let imageURL of postImages){
        let imageRef = storageService.refFromURL(imageURL)
        let url = await imageRef.getDownloadURL()
        result.push(url)
      }
      return result;
    }
    imageURLCheck()
      .then((value)=>{
      setImageURL(value) // url check하고서 동기적으로 imageUrl에 넣어줌
    }).catch((error)=>{
      console.error(error)
    })
    setTimeout(() => setSliderReady(true), 1400)
  },[])

  const onMouseDown = () => {
    img.current.style.cursor = 'grab';
  }

  const onMouseUp = () => {
    img.current.style.cursor = 'default';
  }

  // const onMouseEnter = () => {
  //   if(count.current === undefined){
  //     return;
  //   }
  //   count.current.style.opacity = '1';
  // }

  // const onMouseLeave = () => {
  //   if(count.current === undefined){
  //     return;
  //   }
  //   count.current.style.opacity = '0';
  // }

  const setting = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipToSlide : true,
    lazyLoad : true,
  }

  useEffect(()=>{
    if(postImages.length != 0){
      img.current.style.width = '27rem';
      img.current.style.height = '100%';
      img.current.style.margin = '0';
    }
  }, []);

  return (
    <>
      {(postImages.length != 0) &&
      <S.Li
        ref={img}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        // onMouseEnter={onMouseEnter}
        // onMouseLeave={onMouseLeave}
        >
        {sliderReady || <ImageLoader/>}
        <S.StyledSlider {...setting}>
          {sliderReady && imageURL.map((image, index)=>{
            return (
              <S.Div key={image}>
                <p ref={count}><p>{index+1}/{imageURL.length}</p></p>
                <img src={image} alt="여행사진" />
              </S.Div>
            );
          })}
        </S.StyledSlider>
      </S.Li>}
    </>
  )
}

export default PostSlider;
