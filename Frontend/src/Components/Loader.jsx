import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../assets/loader.json";

const Loader = () => {
  return (
    <div className="flex justify-center items-center ">
      <Lottie
        animationData={loaderAnimation}
        loop={true}
        style={{ width: 200, height: 100 }}
      />
    </div>
  );
};
export default Loader;
