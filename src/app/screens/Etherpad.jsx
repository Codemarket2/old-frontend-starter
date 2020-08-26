import React from "react";

const Etherpad = () => {
  return (
    <div>
      <div>
        {/* <iframe
          name="embed_readwrite"
          src="http://ec2-54-224-21-229.compute-1.amazonaws.com:9001/p/sgsgsg_0876?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false"
          width="100%"
          height="600"
          frameborder="0"
        ></iframe> */}
        <iframe
          name="embed_readonly"
          src="http://ec2-54-224-21-229.compute-1.amazonaws.com:9001"
          width="100%"
          style={{ minHeight: "500px", height: "calc(100vh - 65px)" }}
          frameborder="0"
        ></iframe>
      </div>
    </div>
  );
};

export default Etherpad;
