import React from "react";
import "./table.scss";
// import Utils from "../../../../Utils";
// import NoData from "../../../../Components/Common/NoData";
import { AiOutlineDownload, AiOutlineDelete } from "react-icons/ai";
import { MdModeEditOutline, MdVisibility } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { Spinner } from "react-bootstrap";

interface Column {
  header: string;
  field: string;
  cell?: (row: any) => React.ReactNode;
  total?: boolean;
}

interface CustomTableProps {
  data: any[];
  columns: Column[];
  hover?: boolean;
  striped?: boolean;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
  isEdit?: boolean;
  isView?: boolean;
  isDelete?: boolean;
  isDownload?: boolean;
  isCancel?: boolean;
  onEdit?: (row: any, index: number) => void;
  onView?: (row: any, index: number) => void;
  onDel?: (row: any, index: number) => void;
  onDown?: (row: any, index: number) => void;
  loading?: boolean;
  onRowClick?: (row: any, index: number) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  data = [],
  columns = [],
  hover = true,
  striped = true,
  headerStyle,
  bodyStyle,
  cellStyle,
  isEdit = false,
  isView = false,
  isDelete = false,
  isDownload = false,
  isCancel = false,
  onEdit,
  onView,
  onDel,
  onDown = () => {},
  loading = false,
  onRowClick = () => {},
}) => {
  const calculateGrandTotal = (data: any[], field: string) => {
    return data.reduce((acc, row) => acc + (row[field] || 0), 0);
  };

  const hasTotalColumn = columns.some((col) => col.total);

  return (
    <div className="tdCustomContainer">
      {loading ? (
        <table>
          <thead className="TheadFixed">
            <tr>
              {columns.map((head, index) => (
                <th style={{ ...headerStyle }} key={index}>
                  {head.header}
                </th>
              ))}
              {(isEdit || isDelete || isDownload || isCancel || isView) && (
                <th style={{ ...headerStyle }}>Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={columns.length + 1}>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                  }}
                >
                  <Spinner animation="border" variant="warning" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      ) : data.length === 0 ? (
        <table>
          <thead className="TheadFixed">
            <tr>
              {columns.map((head, index) => (
                <th style={{ ...headerStyle }} key={index}>
                  {head.header}
                </th>
              ))}
              {(isEdit || isDelete || isDownload || isCancel || isView) && (
                <th style={{ ...headerStyle }}>Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={columns.length + 1}>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                  }}
                >
                  {/* <NoData /> */}
                  No data
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table>
          <thead className="TheadFixed">
            <tr>
              {columns.map((head, index) => (
                <th style={{ ...headerStyle }} key={index}>
                  {head.header}
                </th>
              ))}
              {(isEdit || isDelete || isDownload || isCancel || isView) && (
                <th style={{ ...headerStyle }}>Action</th>
              )}
            </tr>
          </thead>
          <tbody style={bodyStyle}>
            {data.map((row, rowIndex) => (
              <tr
                style={{ cursor: "pointer" }}
                key={rowIndex}
                className={`${hover ? "hover" : ""} ${
                  striped ? "striped" : ""
                }`}
                onClick={() => onRowClick?.(row, rowIndex)} // Add click handler
              >
                {columns.map((col, colIndex) => (
                  <td style={cellStyle} key={colIndex}>
                    {col.cell ? col.cell(row) : row[col.field]}
                  </td>
                ))}
                {(isEdit || isDelete || isDownload || isCancel || isView) && (
                  <td style={cellStyle}>
                    {isEdit && (
                      <span
                        style={{ cursor: "pointer", marginRight: "10px" }}
                        onClick={() => onEdit?.(row, rowIndex)}
                        className="svg-icon svg-icon-md svg-icon-primary"
                      >
                        <MdModeEditOutline color="#A21094" />
                      </span>
                    )}
                    {isDelete && (
                      <span
                        style={{ cursor: "pointer", marginRight: "10px" }}
                        onClick={() => onDel?.(row, rowIndex)}
                        className="svg-icon svg-icon-md svg-icon-primary"
                      >
                        <AiOutlineDelete color="#A21094" />
                      </span>
                    )}
                    {isDownload && (
                      <span
                        style={{ cursor: "pointer", marginRight: "10px" }}
                        onClick={() => onDown?.(row, rowIndex)}
                        className="svg-icon svg-icon-md svg-icon-primary"
                      >
                        <AiOutlineDownload color="#A21094" />
                      </span>
                    )}
                    {isCancel && (
                      <span
                        style={{ cursor: "pointer" }}
                        className="svg-icon svg-icon-md svg-icon-primary"
                      >
                        <ImCancelCircle color="#A21094" />
                      </span>
                    )}
                    {isView && (
                      <span
                        title="View Detail"
                        style={{ cursor: "pointer", margin: "10px" }}
                        onClick={() => onView?.(row, rowIndex)}
                        className="svg-icon svg-icon-md svg-icon-primary"
                      >
                        <MdVisibility
                          color="#A21094"
                          style={{ fontSize: "20px" }}
                        />
                      </span>
                    )}
                  </td>
                )}
              </tr>
            ))}
            {hasTotalColumn && (
              <tr>
                {columns.map((col, index) => (
                  <td style={cellStyle} key={index}>
                    {col.total ? (
                      <strong>{calculateGrandTotal(data, col.field)}</strong>
                    ) : (
                      ""
                    )}
                  </td>
                ))}
                {(isEdit || isDelete || isDownload || isCancel || isView) && (
                  <td style={cellStyle}>
                    <strong>TOTAL</strong>
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomTable;
