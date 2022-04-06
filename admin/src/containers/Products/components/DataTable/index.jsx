import React from "react";
import styled from "styled-components";
import { BsPin, BsFillCheckCircleFill } from "react-icons/bs";
import { useTable, usePagination, useRowSelect } from "react-table";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import "./style.scss";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type='checkbox' ref={resolvedRef} {...rest} />
      </>
    );
  }
);

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination,
    useRowSelect
  );

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()} className='products-table'>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className='table-row'>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className='pagination'>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

function App(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: " Avatar",
            accessor: "avatar",
          },
          {
            Header: " Name",
            accessor: "name",
          },
          {
            Header: "Listed Price",
            accessor: "listedPrice",
          },
          {
            Header: "Discount Price",
            accessor: "discountPrice",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Quantity",
            accessor: "quantity",
          },
          {
            Header: (
              <div>
                <p>Is Hot</p>
                <BsPin style={{ cursor: "pointer" }} />
              </div>
            ),
            accessor: "is_hot",
          },
          {
            Header: (
              <div>
                <p>In Slider</p>
                <BsPin style={{ cursor: "pointer" }} />
              </div>
            ),
            accessor: "in_slider",
          },
          {
            Header: "Tags",
            accessor: "tags",
          },
        ],
      },
      {
        Header: "Details",
        columns: [
          {
            Header: "Details",
            accessor: "update",
          },
          {
            Header: "Delete",
            accessor: "delete",
          },
        ],
      },
    ],
    []
  );
  const makeData = (data) => {
    return data.map((product) => {
      return {
        ...product,
        avatar: (
          <img
            className='avatar'
            src={product.avatar}
            style={{ width: "10rem", height: "6rem", objectFit: "cover" }}
          />
        ),
        tags: (
          <div className='table-tags'>
            {product.tags.map((tag) => (
              <span className='table-tag'>{tag}</span>
            ))}
          </div>
        ),
        is_hot: product.is_hot ? <BsFillCheckCircleFill /> : "",
        in_slider: product.in_slider ? <BsFillCheckCircleFill /> : "",
        update: (
          <Button
            className='table-btn--detail'
            onClick={() => props.getProductDetails(product)}
          >
            Details
          </Button>
        ),
        delete: (
          <Button
            className='table-btn--delete'
            onClick={() => props.deleteProduct(product._id)}
          >
            Delete
          </Button>
        ),
      };
    });
  };

  return <Table columns={columns} data={makeData(props.data)} />;
}

export default App;
