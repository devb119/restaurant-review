import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { ToolTipOnHover } from ".";
import { NavigateFunction, useNavigate } from "react-router-dom";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator(
  order: Order,
  orderBy: string
): (a: any, b: any) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export interface HeadCell<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps<T> {
  tableTitle: string;
  selected: T[];
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  orderBy: string;
  total: number;
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headCells: readonly HeadCell<any>[];
  showSearchBar: boolean;
  toolbarItems: JSX.Element;
  onRowClick?: () => void;
  mapDataToRowData: (data: T[], navigate: NavigateFunction) => any[];
}

interface EnhancedTableHeadProps<T> {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  orderBy: string;
  order: Order;
  headCells: readonly HeadCell<T>[];
}

function EnhancedTableHead<T>(props: EnhancedTableHeadProps<T>) {
  const { orderBy, order, onRequestSort, headCells } = props;
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id as string}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              sx={{ fontWeight: 700, paddingTop: 2 }}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable<T extends { id?: string }>(
  props: EnhancedTableProps<T>
) {
  const navigate = useNavigate();

  const [order, setOrder] = React.useState<Order>("asc");
  const [selected, setSelected] = React.useState<T[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { data: rows, orderBy, headCells } = props;

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    console.log("change");

    // setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => {
    return selected?.filter((item) => item?.id === id)[0];
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort<T>(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <p className="text-xl font-bold m-4">{props.tableTitle}</p>
      {props.toolbarItems}
      <Paper sx={{ width: "100%", mb: 2, borderRadius: 8 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead<T>
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {rows.length > 0 ? (
                props
                  .mapDataToRowData(visibleRows, navigate)
                  .map((row, index) => {
                    const isItemSelected = !!isSelected(row.id as string);
                    // const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        // onClick={(event) => handleClick(event, row.id as string)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                        // sx={{ cursor: "pointer" }}
                      >
                        {/* <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell> */}
                        <>
                          {Object.keys(row).map((key) => {
                            // console.log(key);
                            if (key === "id" || typeof key == "undefined")
                              return;
                            else
                              return (
                                <TableCell
                                  className="w-52 h-52 font-montserrat"
                                  align="center"
                                >
                                  <ToolTipOnHover
                                    textContent={row[key]}
                                    limit={20}
                                  ></ToolTipOnHover>
                                </TableCell>
                              );
                          })}
                        </>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={headCells.length} align="center">データがありません</TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelDisplayedRows={({ from, to, count }) => {
            return ` ${
              count !== -1 ? count : `${to}より多い`
            }レコードの中${from}から - ${to} まで`;
          }}
          rowsPerPageOptions={[2, 5, 10, 25]}
          labelRowsPerPage={<div>ページあたりの行数</div>}
          component="div"
          count={props.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
