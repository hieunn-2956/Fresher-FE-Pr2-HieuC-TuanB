import React from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import FormatDate from "../../../../components/UI/FormatDate";

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable(
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
    </>
  );
}

function App(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: " PayablePrice",
        accessor: "payablePrice",
      },
      {
        Header: " PurchaseQty",
        accessor: "purchaseQty",
      },
    ],
    []
  );

  const makeData = (data) => {
    return data.map((item) => {
      return {
        ...item,
        name: item.productId.name,
        payablePrice: item.payablePrice,
        purchaseQty: item.purchaseQty,
      };
    });
  };

  return <Table columns={columns} data={makeData(props.data)} />;
}

export default App;
