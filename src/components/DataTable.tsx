import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { DocumentData } from "firebase/firestore";
import { useMemo, useState } from "react";

export const DataTable = ({
  headers,
  data,
}: {
  headers: { [key: string]: string };
  data: { [key: string]: JSX.Element }[] | undefined;
}) => {
  const [sort, setSort] = useState({
    key: Object.keys(headers)[0],
    ascending: true,
  });
  const sortedData = useMemo(
    () =>
      data?.sort((a, b) =>
        a[sort.key] < b[sort.key] ? -1 : a[sort.key] > b[sort.key] ? 1 : 0
      ),
    [sort.key, sort.ascending, data]
  );
  console.log(sortedData);
  const HeaderCell = ({
    dbKey,
    label,
    index,
  }: {
    dbKey: string;
    label: string;
    index: number;
  }) => (
    <div
      key={`datatable__${dbKey}__${label}`}
      className={clsx(
        "group select-none gap-3 cursor-pointer font-semibold py-2 px-3 flex items-center justify-center bg-blue-200",
        index === 0 && "rounded-tl",
        index === Object.keys(headers).length - 1 && "rounded-tr"
      )}
      onClick={() =>
        setSort({
          key: dbKey,
          ascending: dbKey === sort.key ? !sort.ascending : true,
        })
      }
    >
      <div className="h-4 w-4" aria-hidden="true" />
      {label}
      <div className="h-4 w-4">
        {dbKey === sort.key ? (
          sort.ascending ? (
            <ChevronDownIcon />
          ) : (
            <ChevronUpIcon />
          )
        ) : (
          <ChevronDownIcon className="text-gray-500 hidden group-hover:block" />
        )}
      </div>
    </div>
  );
  const DataCell = ({
    row,
    col,
    dbKey,
    value,
  }: {
    row: number;
    col: number;
    dbKey: string;
    value: any;
  }) => (
    <div
      key={`datacell__${dbKey}__${value}`}
      className={clsx(
        row % 2 === 0 ? "bg-white" : "bg-blue-100",
        "py-2 px-3 flex items-center justify-center",
        row === (sortedData?.length ?? 0) - 1 &&
          (col === 0 || col === Object.keys(headers).length - 1)
      )}
      style={{ gridColumn: Object.keys(headers)?.indexOf(dbKey) + 1 }}
    >
      {value}
    </div>
  );
  const DataRow = ({ datum, row }: { datum: DocumentData; row: number }) => {
    const dataEntries = Object.entries(datum);
    return (
      <>
        {Object.keys(headers).map((header, col) => (
          <DataCell
            row={row}
            col={col}
            dbKey={header}
            value={dataEntries.find(([key]) => key === header)?.[1] ?? ""}
          />
        ))}
      </>
    );
  };

  if (!sortedData) return null;
  return (
    <div
      className="grid"
      style={
        {
          // gridTemplateColumns: `repeat(${
          //   Object.keys(data[0])?.length || 0
          // }, 1fr)`,
          // gridTemplateRows: `repeat(${data.length || 0}, 1fr)`,
        }
      }
    >
      {Object.entries(headers).map(([dbKey, label], index) => (
        <HeaderCell dbKey={dbKey} label={label} index={index} />
      ))}
      {sortedData.map((datum, row) => (
        <DataRow datum={datum} row={row} />
      ))}
    </div>
  );
};
