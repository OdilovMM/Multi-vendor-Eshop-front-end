import React from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

// ALways set up these states when importing this pagination component
// const [parPage, setParPage] = useState(5);
// const [currentPage, setCurrentPage] = useState(1);
// const [search, setSearch] = useState("");

const Pagination = ({
  pageNumber,
  setPageNumber,
  totalItem,
  pages,
  showItem,
}) => {
  let totalPage = Math.ceil(totalItem / pageNumber);
  let startPage = pageNumber;

  let various = totalPage - pageNumber;
  if (various <= showItem) {
    startPage = totalPage - showItem;
  }
  let endPage = startPage < 0 ? showItem : showItem + startPage;

  if (startPage <= 0) {
    startPage = 1;
  }

  const createBtn = () => {
    const btns = [];
    for (let i = startPage; i < endPage; i++) {
      btns.push(
        <li
          key={i}
          onClick={() => setPageNumber(i)}
          className={` ${
            pageNumber === i
              ? "bg-indigo-300 shadow-lg  text-white"
              : "bg-slate-600 hover:bg-indigo-300   hover:text-white text-[#d0d2d6]"
          } w-[25px] h-[25px] rounded-full flex justify-center items-center cursor-pointer `}
        >
          {i}
        </li>
      );
    }
    return btns;
  };

  return (
    <ul className="flex gap-2 mt-3">
      {pageNumber > 1 && (
        <li
          onClick={() => setPageNumber(pageNumber - 1)}
          className="w-[25px] h-[25px] cursor-pointer rounded-full flex justify-center items-center bg-slate-400 text-[#fff]"
        >
          <MdKeyboardDoubleArrowLeft />
        </li>
      )}
      {createBtn()}
      {pageNumber < totalPage && (
        <li
          onClick={() => setPageNumber(pageNumber + 1)}
          className="w-[25px] h-[25px] cursor-pointer rounded-full flex justify-center items-center bg-slate-400 text-[#fff]"
        >
          <MdKeyboardDoubleArrowRight />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
