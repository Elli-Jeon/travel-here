import Loader from "react-loader-spinner";

const style = {
  textAlign: "center",
  marginTop: "1rem",
};

export default function Loading({ width, height }) {
  return (
    <Loader
      type="Oval"
      color="#3d66ba"
      height={width}
      width={height}
      style={style}
      // timeout={10000}
    />
  );
}
