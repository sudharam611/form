import React from "react";

const Header = ({ heading, description }) => {
  return (
    <div>
      <h3 className="heading">{heading}</h3>
      <p className="description">{description}</p>
    </div>
  );
};

export default Header;
