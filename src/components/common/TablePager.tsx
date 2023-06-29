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

interface HeadCell<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps<T> {
  tableTitle: string;
  selected: T[];
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  rowData: T[];
  headCells: readonly HeadCell<T>[];
  showSearchBar: boolean;
  searchKey: string;
  toolbarItems: JSX.Element;
}

function EnhancedTableHead<T>(props: EnhancedTableProps<T>) {
  const {
    // onSelectAllClick,
    order,
    orderBy,
    // selected,
    // rowCount,
    onRequestSort,
    headCells,
  } = props;
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  // const numSelected = selected.length;
  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox"> */}
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          /> */}
        {/* </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id as string}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              sx={{fontWeight:700 , paddingTop: 2}}
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
  const [order, setOrder] = React.useState<Order>("asc");
  const [selected, setSelected] = React.useState<T[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { rowData: rows, orderBy, headCells } = props;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    // setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows;
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedItem = selected.filter((item) => item.id === id)[0]
    let newSelected: T[] = [];

    if (!selectedItem) {
      newSelected = newSelected.concat(selected,selectedItem);
    }
    else newSelected = selected.filter((item) => item.id !== id);
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
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
  }

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
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead<T>
              tableTitle={props.tableTitle}
              selected={selected}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              rowData={rows}
              headCells={headCells}
              showSearchBar={props.showSearchBar}
              searchKey={props.searchKey}
              toolbarItems={props.toolbarItems}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = !!isSelected(row.id as string);
                // const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row.id as string)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
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
                        if (key === "id" || typeof key == "undefined") return;
                        else
                          return (
                            <TableCell className="w-52 h-52" align="center">
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
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height:  53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
