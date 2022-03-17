import React, { useState } from "react";

function Laptop({ name, brand, weight }) {
  const [showMore, setShowMore] = useState(false);

  const detailsStyle = {
    maxHeight: showMore ? "4rem" : "0",
    overflow: "hidden",
    background: "red",
  };
  return (
    <div>
      <h2>{name}</h2>
      <h2>{weight}</h2>
      <button onClick={() => setShowMore(!showMore)}>
        {showMore ? "Show Less" : "Show More"}
      </button>
      <div style={detailsStyle} className="details">
        <p>Brand: {brand}</p>
        <p>Weight: {weight}kg</p>
      </div>
    </div>
  );
}

export default Laptop;
