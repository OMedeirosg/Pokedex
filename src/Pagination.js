import React from "react";
import style from "./style.css";

export default function Pagination({
  gotoNextPage,
  gotoPrevPage,
  currentPageNumber,
  maxPageNumber,
}) {
  return (
    <div className="pagi">
      {gotoPrevPage && (
        <button className="paginationBtn" onClick={gotoPrevPage}>
          Previous
        </button>
      )}
      <div className="current-page">
        <p>{currentPageNumber}</p>
        <p>/</p>
        <p>{maxPageNumber}</p>
      </div>
      {gotoNextPage && (
        <button className="paginationBtn" onClick={gotoNextPage}>
          Next
        </button>
      )}
    </div>
  );
}
