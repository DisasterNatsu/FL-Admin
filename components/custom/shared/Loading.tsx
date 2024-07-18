import React from "react";
import { DNA } from "react-loader-spinner";
import Typewriter from "typewriter-effect";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center space-x-5">
      <DNA height="80" width="80" key="loader" ariaLabel="loading" />
      <Typewriter
        options={{
          strings: ["Loading..."],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
};

export default Loading;
