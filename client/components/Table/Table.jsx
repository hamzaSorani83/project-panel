import React, { useState } from "react";

import classes from "./Table.module.css";
import Pagination from './Pagination';

const Table = ({headData, renderHead, bodyData, renderBody, currentPage, next, prev}) => {
  return (
    <div>
      <div className={classes.TableWrapper}>
        <table>
          {headData && renderHead ? (
            <thead>
              <tr>
                {headData.map((item, index) =>
                  renderHead(item, index)
                )}
              </tr>
            </thead>
          ) : null}
          {bodyData && renderBody ? (
            <tbody>
              {bodyData.map((item, index) => renderBody(item, index))}
            </tbody>
          ) : null}
        </table>
      </div>
      <Pagination currentPage={currentPage} next={next} prev={prev} />
    </div>
  );
};

export default Table;
