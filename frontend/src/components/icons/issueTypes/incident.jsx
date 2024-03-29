import React from "react";

const IncidentIcon = (props) => {
  return (
    <svg
      fill="currentColor"
      flexshrink="0"
      userselect="none"
      {...props}
    >
      <path
        d="M0 1.777C0 .796.796 0 1.777 0h12.446C15.204 0 16 .796 16 1.777v12.446c0 .981-.796 1.777-1.777 1.777H1.777A1.778 1.778 0 0 1 0 14.223V1.777z"
        fill="#FF5630"
      />
      <circle fill="#FFF" cx="8" cy="8" r="4" />
    </svg>
  );
};

export default IncidentIcon;
