import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import karbala from "../images/karbala.jpg";
import styles from "./LotterySignupPage.module.css";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";

export default function LotterySignupPage({ token }) {
  const [signups, setSignups] = useState([]);
  const [allSignups, setAllSignups] = useState([]);
  const [filteredAllSignups, setFilteredAllSignups] = useState([]);

  const getUsersSignups = async () => {
    await axios({
      url: `${process.env.REACT_APP_BASEURL}/api/v1/lottery-players`,
      method: "get",
      data: null,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => {
        setSignups(resp.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUsersSignups();
  }, []);

  const getAllUsersSignups = async () => {
    await axios({
      url: `${process.env.REACT_APP_BASEURL}/api/v1/lottery-players-all`,
      method: "get",
      data: null,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => {
        setAllSignups(resp.data.data);
        setFilteredAllSignups(resp.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (word) => {
    console.log(word);
    let filter;
    if (/\d/.test(word)) {
      filter = allSignups.filter((item) => item.phone.startsWith(word));
    } else {
      console.log(word);

      filter = allSignups.filter((item) => item.name.includes(word) || item.lastname.includes(word));
    }
    setAllSignups(filter);
    if (word.length == 0) {
      setAllSignups(filteredAllSignups);
    }
  };

  const ITEMS_PER_PAGE = 12;
  const MAX_PAGE_BUTTONS = 3;

  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = allSignups.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to get the current page's data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allSignups.slice(startIndex, endIndex);
  };

  // Function to get the page numbers to display
  const getPageNumbers = () => {
    const currentPageIndex = currentPage - 1;
    let startPage = Math.max(currentPageIndex - Math.floor(MAX_PAGE_BUTTONS / 2), 0);
    const endPage = Math.min(startPage + MAX_PAGE_BUTTONS - 1, totalPages - 1);

    if (endPage - startPage < MAX_PAGE_BUTTONS - 1) {
      startPage = Math.max(endPage - MAX_PAGE_BUTTONS + 1, 0);
    }

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index + 1);

    if (startPage > 0) {
      pageNumbers.unshift("...");
      pageNumbers.unshift(1);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  useEffect(() => {
    getUsersSignups();
    getAllUsersSignups();
  }, []);

  return (
    <Container maxWidth="lg" className="home-box">
      <img src={karbala} alt="karbala" />
      <Box className="welcome-box" style={{ width: "calc(100% - 100px)" }}>
        <Box className="welcome-page">
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
            <input
              style={{
                width: "270px",
                outline: "none",
                border: "none",
                borderBottom: "1px solid #ccc",
                fontSize: "16px",
                padding: "5px 10px",
              }}
              onChange={(e) => handleSearch(e.target.value)}
              type="text"
              placeholder="نام و نام خانوادگی / شماره تماس"
            />
            <SearchIcon sx={{ marginLeft: "-30px", fontSize: "18px" }} />
          </Box>
          <Box md={12} className={styles.lotteryBox}>
            <Typography sx={{ fontWeight: "700", margin: "10px 0 30px" }} fontSize={20}>
              لیست تمامی شرکت کننده ها ({allSignups.length})
            </Typography>
            <table className={styles.tableSignup}>
              <tr>
                <th>ردیف</th>
                <th>نام و نام خانوادگی</th>
                <th>تعداد ثبت نامی</th>
                <th>شماره تماس</th>
              </tr>
              {getCurrentPageData().map((item, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    {item.name} {item.lastname}
                  </td>
                  <td>{item.register_count}</td>
                  <td>{item.phone.substring(8) + "****" + item.phone.substring(0, 4)}</td>
                </tr>
              ))}
            </table>
          </Box>

          <Box display="flex" alignItems="center">
            <Box display="flex" alignItems="center" justifyContent="center" mt={2} gap="10px" width="100%">
              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === "..." ? (
                    <Button
                      sx={{
                        background: "transparent",
                        color: "#002722",
                        padding: "0",
                        width: "30px !important",
                        minWidth: "0 !important",
                      }}
                    >
                      ...
                    </Button>
                  ) : (
                    <Button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      disabled={currentPage === page}
                      sx={{
                        border: "1px solid  #999",
                        background: currentPage === page ? "#00554e" : "transparent",
                        color: currentPage === page ? "#fff !important" : "#002722",
                        // theme.palette.mode == "light" ? "#002722" : "#fff",
                        padding: "0",
                        width: "30px !important",
                        minWidth: "0 !important",
                      }}
                    >
                      {page}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
