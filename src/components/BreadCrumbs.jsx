import React from "react";
import { Link } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { RiArrowRightSLine } from "react-icons/ri";

const BreadCrumbs = ({
  fromPage,
  toPage,
  nextPage,
  to,
  from,
  iconSize,
  iconColor,
}) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ul className="flex items-center justify-center md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            to={from}
            className="inline-flex items-center font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <TiHome size={iconSize} color={iconColor} />
            <span className="pl-1 text-black">{fromPage}</span>
          </Link>
        </li>
        <li className="inline-flex items-center">
          <Link
            to={to}
            className="inline-flex items-center font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <RiArrowRightSLine
              className="mt-1"
              size={iconSize}
              color={iconColor}
            />
            <span className="text-black">{toPage}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BreadCrumbs;
