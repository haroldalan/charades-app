"use client";
import React from "react";

function NextMovieButton({ onClick }) {
  return (
    <button aria-label="Next Movie" className="next-movie-button" onClick={onClick}>
      <svg
        width="197"
        height="60"
        viewBox="0 0 197 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "197px", height: "60px" }}
      >
        <g clipPath="url(#clip0_28_10)">
          <rect width="197" height="60" fill="#F4D762"></rect>
          <rect
            x="127.525"
            y="-17"
            width="10"
            height="100"
            transform="rotate(26.4391 127.525 -17)"
            fill="black"
          ></rect>
          <rect
            x="142.003"
            y="-17"
            width="10"
            height="100"
            transform="rotate(26.4391 142.003 -17)"
            fill="black"
          ></rect>
          <rect
            x="156.482"
            y="-17"
            width="10"
            height="100"
            transform="rotate(26.4391 156.482 -17)"
            fill="black"
          ></rect>
          <rect
            x="170.961"
            y="-17"
            width="10"
            height="100"
            transform="rotate(26.4391 170.961 -17)"
            fill="black"
          ></rect>
          <rect
            x="185.44"
            y="-17"
            width="10"
            height="100"
            transform="rotate(26.4391 185.44 -17)"
            fill="black"
          ></rect>
          <rect
            x="199.918"
            y="-17"
            width="10"
            height="100"
            transform="rotate(26.4391 199.918 -17)"
            fill="black"
          ></rect>
          <rect
            x="214.397"
            y="-17"
            width="10"
            height="100"
            transform="rotate(26.4391 214.397 -17)"
            fill="black"
          ></rect>
          <rect
            x="228.876"
            y="-17"
            width="10"
            height="100"
            transform="rotate(26.4391 228.876 -17)"
            fill="black"
          ></rect>
          <text
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Impact"
            fontSize="16"
            letterSpacing="0em"
          >
            <tspan x="16" y="36.3828">
              Next Movie
            </tspan>
          </text>
          <path
            d="M185 30L152.906 11.4707L152.906 48.5293L185 30ZM115 33.2094L156.116 33.2094L156.116 26.7906L115 26.7906L115 33.2094Z"
            fill="#F4D762"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_28_10">
            <rect width="197" height="60" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}

export default NextMovieButton;