import React from "react";
import { useNavigate } from "react-router-dom";

const SlideButton = ({ value, url, nav }) => {
  const navigate = useNavigate();

  const baseClasses =
    "inline-block px-6 py-3 font-body tracking-wider " +
    "bg-brand text-white rounded-full cursor-pointer transition-all duration-200 ease-in-out " +
    "hover:bg-brand-light hover:shadow-md";

  if (url) {
    return (
      <a href={url} className={baseClasses}>
        {value}
      </a>
    );
  }

  if (nav) {
    return (
      <button
        className={baseClasses}
        onClick={() => navigate(nav)}
      >
        {value}
      </button>
    );
  }

  return <button className={baseClasses}>{value}</button>;
};

export default SlideButton;
