import React from "react";

const Home = () => {
  return (
    <div>
      <div className="row home-div">
        <div className="col">
          <div>
            <video style={{ width: "100%" }} controls>
              <source src={require("../../assets/home.mp4")} type="video/mp4" />
            </video>
          </div>
        </div>
        <div style={{ textAlign: "center" }} className="col">
          <h1>
            Beverly Hills
            <br />
            Wellness Center
          </h1>
          <span>of</span>
          <p>Regenerative Medicine</p>
        </div>
      </div>
      <div className="row home-text">
        <div className="col">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text
        </div>
        <div className="col">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text
        </div>
        <div className="col">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text
        </div>
      </div>
    </div>
  );
};

export default Home;
