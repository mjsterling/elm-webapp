import clsx from "clsx";
import { DocumentData } from "firebase/firestore";

export const DataTable = ({
  headers,
  data,
}: {
  headers: { [key: string]: string };
  data: { [key: string]: JSX.Element }[] | undefined;
}) => {
  const HeaderCell = ({
    content,
    index,
  }: {
    content: string;
    index: number;
  }) => (
    <div
      className={clsx(
        "font-semibold p-2 flex items-center justify-center bg-blue-200",
        index === 0 && "rounded-tl",
        index === Object.keys(headers).length - 1 && "rounded-tr"
      )}
    >
      {content}
    </div>
  );
  const DataCell = ({
    row,
    dbKey,
    value,
  }: {
    row: number;
    dbKey: string;
    value: any;
  }) => (
    <div
      className={clsx(
        row % 2 === 0 ? "bg-white" : "bg-blue-100",
        "p-2 flex items-center justify-center"
      )}
      style={{ gridColumn: Object.keys(headers).indexOf(dbKey) + 1 }}
    >
      {value}
    </div>
  );
  const DataRow = ({ datum, row }: { datum: DocumentData; row: number }) => {
    const dataEntries = Object.entries(datum);
    return (
      <>
        {Object.keys(headers).map((header) => (
          <DataCell
            row={row}
            dbKey={header}
            value={dataEntries.find(([key]) => key === header)?.[1] ?? ""}
          />
        ))}
      </>
    );
  };

  if (!data) return null;
  return (
    <div
      className="grid rounded"
      style={
        {
          // gridTemplateColumns: `repeat(${
          //   Object.keys(data[0])?.length || 0
          // }, 1fr)`,
          // gridTemplateRows: `repeat(${data.length || 0}, 1fr)`,
        }
      }
    >
      {Object.values(headers).map((label, index) => (
        <HeaderCell content={label} index={index} />
      ))}
      {data.map((datum, row) => (
        <DataRow datum={datum} row={row} />
      ))}
    </div>
  );
};
