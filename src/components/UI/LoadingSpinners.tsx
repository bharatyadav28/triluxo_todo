import { Triangle, ThreeDots } from "react-loader-spinner";

export const TriangleSpinner = () => {
  return (
    <div className="flex justify-center">
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#000000"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export const ThreeDotsSpinner = () => {
  return (
    <div className="flex justify-center">
      <ThreeDots
        visible={true}
        height="20"
        width="20"
        color="#0F0F0F"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
