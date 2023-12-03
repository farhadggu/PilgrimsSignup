import { Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./LotterySignupPage.module.css";
import karbala from "../images/karbala.jpg";
import SearchIcon from "@mui/icons-material/Search";

export default function LotteryWinnersSignupPage() {
  const [signups, setSignups] = useState([]);
  const [lotteryDay, setLotteryDay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allSignups, setAllSignups] = useState([]);
  const [filteredAllSignups, setFilteredAllSignups] = useState([]);
  const [active, setActive] = useState(false)

  const getUsersSignups = async () => {
    setLoading(true);
    await axios({
      url: `${process.env.REACT_APP_BASEURL}/api/v1/lottery-day`,
      method: "get",
      data: null,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(async (resp) => {
        setLotteryDay(true);
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
            setLoading(false);
            setFilteredAllSignups(resp.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
        // if (parseInt(resp.data.data.day.slice(-2), 10) === new Date().getDate()) {

        // } else {
        //   setLotteryDay(false);
        //   setLoading(false);
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (word) => {
    setCurrentPage(1);
    console.log(word);
    if (word.trim() === "") {
      // If the search word is empty or only contains spaces, set signups to the original data
      setSignups(filteredAllSignups);
    } else {
      const searchWords = word.trim().split(" "); // Split the input by spaces
      let filter = filteredAllSignups.filter((item) =>
        searchWords.every((searchWord) => {
          if (/^989\d{9}$|^09\d{9}$|^9\d{9}$/.test(searchWord)) {
            // If the search word matches the Persian phone number format, search in numbers
            console.log(searchWord)
            return (
              item.phone.startsWith(searchWord) ||
              item.number_of_row === Number(searchWord)
            );
          } else {
            // Otherwise, search in full_name
            return item.full_name.trim().toLowerCase().includes(searchWord.toLowerCase());
          }
        })
      );
      setSignups(filter);
    }
  };

  const ITEMS_PER_PAGE = 12;
  const MAX_PAGE_BUTTONS = 3;

  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = signups.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to get the current page's data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return signups.slice(startIndex, endIndex);
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

  const handlePilgrims = async ({ value }) => {
    setLoading(true);
    if (value) {
      await axios({
        url: `${process.env.REACT_APP_BASEURL}/api/v1/lottery-players?pilgrims=${1}`,
        method: "get",
        data: null,
        headers: { Accept: "application/json", "Content-Type": "application/json" },
      }).then((resp) => {
        setSignups(resp.data.data);
        setFilteredAllSignups(resp.data.data);
        setLoading(false);
      });
    } else {
      await axios({
        url: `${process.env.REACT_APP_BASEURL}/api/v1/lottery-players?pilgrims=${0}`,
        method: "get",
        data: null,
        headers: { Accept: "application/json", "Content-Type": "application/json" },
      }).then((resp) => {
        setSignups(resp.data.data);
        setFilteredAllSignups(resp.data.data);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    getUsersSignups();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" className="home-box">
        <img src={karbala} alt="karbala" />
        <Box className="welcome-box" style={{ width: "calc(100% - 100px)" }}>
          <Box className="welcome-page">
            <div className="content" style={{ width: "100%" }}></div>
          </Box>
        </Box>
      </Container>
    );
  } else {
    return (
      <Container maxWidth="lg" className="home-box">
        <img src={karbala} alt="karbala" />
        <Box className="welcome-box" style={{ width: "calc(100% - 100px)" }}>
          <Box className="welcome-page">
            {!lotteryDay ? (
              <Box md={12} sx={{ height: "100px" }} className={styles.lotteryBox}>
                <h3 style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>صفحه مورد نظر یافت نشد!</h3>
              </Box>
            ) : (
              <>
                <Box  className={styles.winnersHeader}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div
                      style={{
                        fontSize: "16px !important",
                        padding: "5px",
                        backgroundColor: `${active === 1 ? "#fff" : "#b83290"}`,
                        color: `${active === 1 ? "#b83290" : "#fff"}`,
                        border: "1px solid #b83290",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                      onClick={() => {handlePilgrims({ value: true }); setActive(1)}}
                    >
                      5 سال اخیر رفتند
                    </div>
                    <div
                      style={{
                        fontSize: "16px !important",
                        padding: "5px",
                        backgroundColor: `${active === 2 ? "#fff" : "#b83290"}`,
                        color: `${active === 2 ? "#b83290" : "#fff"}`,
                        border: "1px solid #b83290",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                      onClick={() => {handlePilgrims({ value: false }); setActive(2)}}
                    >
                      5 سال اخیر نرفتند
                    </div>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <input
                      style={{
                        width: "320px",
                        outline: "none",
                        border: "none",
                        borderBottom: "1px solid #ccc",
                        fontSize: "16px",
                        padding: "5px 10px",
                      }}
                      onChange={(e) => handleSearch(e.target.value)}
                      type="text"
                      placeholder="نام و نام خانوادگی / شماره تماس ...0912"
                    />
                    <SearchIcon sx={{ marginLeft: "-30px", fontSize: "18px" }} />
                  </Box>
                </Box>

                <Box md={12} className={styles.lotteryBox}>
                  <Typography sx={{ fontWeight: "700", margin: "10px 0 30px" }} fontSize={20}>
                    لیست شرکت کننده هایی که پاسخ صحیح داده اند ({signups.length})
                  </Typography>
                  <table className={styles.tableSignup}>
                    <tr>
                      <th>ردیف</th>
                      {/* <th>شناسه</th> */}
                      <th>نام و نام خانوادگی</th>
                      <th>شماره تماس</th>
                    </tr>
                    {getCurrentPageData().map((item, i) => (
                      <tr key={i}>
                        <td>{item.number_of_row}</td>
                        {/* <td>{item.lottery_number}</td> */}
                        <td>{item.full_name}</td>
                        <td>{item.phone.substring(8) + "***" + item.phone.substring(0, 4)}</td>
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
                              padding: "10px 20px !important",
                              width: "20px !important",
                              minWidth: "0 !important",
                              fontSize: "14px !important"
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
                              padding: "10px 14px !important",
                              width: "20px !important",
                              minWidth: "0 !important",
                              fontSize: "12px !important"
                            }}
                          >
                            {page}
                          </Button>
                        )}
                      </React.Fragment>
                    ))}
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Container>
    );
  }
}
