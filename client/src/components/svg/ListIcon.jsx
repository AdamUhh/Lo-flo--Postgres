import * as React from "react";

const SvgListicon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="listicon_svg__icon listicon_svg__icon-tabler listicon_svg__icon-tabler-list-search"
    width={32}
    height={32}
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#2c3e50"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <circle cx={15} cy={15} r={4} />
    <path d="M18.5 18.5 21 21M4 6h16M4 12h4M4 18h4" />
  </svg>
);

export default SvgListicon;

