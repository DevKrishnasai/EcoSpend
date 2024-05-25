"use client";
import { TRangedTransactions } from "@/app/api/transactions-history/route";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  _getVisibleLeafColumns,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomSkeloton from "@/components/CustomSkeloton";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { DataTableFacetedFilter } from "@/components/table/DataTableFacetedFilter";
import { DataTableViewOptions } from "@/components/table/DataTableViewOptions";
import { Button } from "@/components/ui/button";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { toast } from "sonner";
import { Download, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { DeleteTransaction } from "../actions";
import { cn } from "@/lib/utils";

export const TransactionsTable = ({
  transactions,
  isLoading,
  currency,
  setRandom,
}: {
  transactions: TRangedTransactions;
  isLoading: boolean;
  currency: string;
  setRandom: Dispatch<SetStateAction<number>>;
}) => {
  const deleteMutation = useMutation({
    mutationKey: ["delete-transaction"],
    mutationFn: DeleteTransaction,
    onSuccess: () => {
      toast.success("Transaction deleted successfully", {
        id: "delete-transaction",
      });
      setRandom(Math.random());
    },
    onError: () => {
      toast.error("An error occured while deleting transaction", {
        id: "delete-transaction",
      });
    },
  });
  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    decimalSeparator: ".",
    fieldSeparator: ",",
  });

  const columns: ColumnDef<TRangedTransactions[0]>[] = [
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader title="Categories" column={column} />
      ),
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
      cell: ({ row }) => {
        return (
          <div>
            {row.original.categoryIcon}
            <span className="ml-2">{row.original.category}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader title="Description" column={column} />
      ),
      cell: ({ row }) => {
        return <div className="capitalize">{row.original.description}</div>;
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader title="Date" column={column} />
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.date);
        const formattedDate = date.toLocaleDateString("default", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        return <div>{formattedDate}</div>;
      },
    },

    {
      accessorKey: "type",
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
      header: ({ column }) => (
        <DataTableColumnHeader title="Type" column={column} />
      ),
      cell: ({ row }) => {
        return <div>{row.original.type}</div>;
      },
    },
    {
      accessorKey: "amount",
      enableHiding: false,
      header: ({ column }) => (
        <DataTableColumnHeader title="Amount" column={column} />
      ),
      cell: ({ row }) => {
        return (
          <div className="">
            {currency} {row.original.amount}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="w-full">
            <Button
              variant="outline"
              size="sm"
              className="text-end hover:bg-red-700 ml-auto"
              onClick={() => {
                toast.loading("Deleting transaction...", {
                  id: "delete-transaction",
                });
                deleteMutation.mutate(row.original);
              }}
            >
              <Trash size={15} />
            </Button>
          </div>
        );
      },
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const uniqueCategories = useMemo(() => {
    const categoriesMap = new Map();
    transactions.forEach((transaction) => {
      categoriesMap.set(transaction.categoryIcon + transaction.category, {
        label: transaction.categoryIcon + " " + transaction.category,
        value: transaction.category,
      });
    });
    const categories = new Set(categoriesMap.values());
    return Array.from(categories);
  }, [transactions]);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setColumnVisibility({
        category: false,
        date: true,
        type: true,
        amount: true,
        description: false,
      });
    }
  }, []);

  const handleExport = () => {
    toast.loading("Exporting data...", {
      id: "exporting",
    });
    try {
      const visibleColumns = _getVisibleLeafColumns(table);
      const visibleColumnKeys = visibleColumns.map((col) => col.id);

      const sortedAndFilteredRows = table
        .getSortedRowModel()
        .rows.map((row) => {
          const rowData: any = {};
          visibleColumnKeys.forEach((key) => {
            if (key === "date") {
              rowData[key] = row.original[key].toString();
            } else {
              rowData[key] = row.original[key as keyof typeof row.original];
            }
          });
          return rowData;
        });

      const csv = generateCsv(csvConfig)(sortedAndFilteredRows);
      download(csvConfig)(csv);
      toast.success("successfully exported data...", {
        id: "exporting",
      });
    } catch (error) {
      toast.error("something went wrong cannot export data...", {
        id: "exporting",
      });
    }
  };

  return (
    <>
      {/* <pre>{JSON.stringify(uniqueCategories, null, 2)}</pre> */}
      <div className="flex items-center my-3 w-full gap-2">
        {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            title="Category"
            options={uniqueCategories}
          />
        )}
        {table.getColumn("type") && (
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="Type"
            options={[
              { label: "Income", value: "Income" },
              { label: "Expense", value: "Expense" },
            ]}
          />
        )}
        <DataTableViewOptions table={table} />
      </div>
      <CustomSkeloton isLoading={isLoading}>
        <Table className="border w-full overflow-scroll">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-[200px] text-center"
                >
                  No results found
                  <p className="text-sm">
                    try selecting other filters or dates
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {_getVisibleLeafColumns(table).length === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-[200px] text-center "
              >
                No columns selected
              </TableCell>
            </TableRow>
          )}
        </Table>
      </CustomSkeloton>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "flex gap-2 items-center",
            transactions.length === 0 && "cursor-not-allowed opacity-50"
          )}
          onClick={handleExport}
          disabled={transactions.length === 0}
        >
          <Download size={15} />
          Export
        </Button>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default TransactionsTable;
