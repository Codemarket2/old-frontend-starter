import React from "react";

const Ivdrip = ({ data, match }) => {
  const { title, description } = data.find((d) => d.slug === match.params.slug);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Ivdrip;
