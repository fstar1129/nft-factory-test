import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { baseUrl } from "../utils/utils";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DoneIcon from '@mui/icons-material/Done';


function TableMintData() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      await fetch(`${baseUrl}/mints`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    })();
  }, [data]);
  const [copied, setCopied] = useState(-1);
  return (
    <>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Id
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Token Id
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                TxHash
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Token Uri
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Collection
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" sx={{ color: "white" }}>
                  {index + 1}
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  {row.tokenId}
                </TableCell>
                <TableCell
                  align="center"
                  className="hover:cursor-pointer hover:text-blue-500"
                  sx={{ color: "white" }}
                  onClick={() =>
                    window.open(
                      `https://mumbai.polygonscan.com/tx/${row.transactionHash}`
                    )
                  }
                >
                  {row.transactionHash.substring(0, 10)}...
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white" }}
                  className="hover:cursor-pointer hover:text-blue-500"
                >
                  {row.tokenUri}
                </TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  {row.collection.substring(0, 10)}...
                  {copied !== index ? (
                    <>
                      <ContentCopyRoundedIcon
                        onClick={() => {
                          navigator.clipboard.writeText(row.collection);
                          setCopied(index);
                          setTimeout(() => {
                            setCopied(-1);
                          }, 500);
                        }}
                        sx={{ cursor: "pointer" }}
                      ></ContentCopyRoundedIcon>
                    </>
                  ) : (
                    <DoneIcon></DoneIcon>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableMintData;
