import ContentLoader from "react-content-loader";

const ImageLoader = () => {
  return (
  <ContentLoader
    width= {400}
    height= {400}
    viewBox = "0 0 400 400"
    speed={2}
    gradientRatio ={2}
    backgroundColor="#F6F8FA"
    foregroundColor="#6f79a8"
  >
    <rect x="0" y="0" rx="3" ry="3" width="432" height="400" /> 
  </ContentLoader>
  );
}

export default ImageLoader