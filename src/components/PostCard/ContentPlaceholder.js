import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    gradientRatio ={2}
    width={280}
    height={380}
    viewBox="0 0 300 380"
    backgroundColor="#F6F8FA"
    foregroundColor="#6f79a8"
    {...props}
  >
    <circle cx="40" cy="35" r="20" />
    <rect x="80" y="20" rx="3" ry="3" width="150" height="30" /> 
    <rect x="18" y="70" rx="3" ry="3" width="250" height="250" /> 

  </ContentLoader>
)

export default MyLoader