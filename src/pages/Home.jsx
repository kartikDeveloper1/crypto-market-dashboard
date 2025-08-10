import { useEffect, useState, useMemo } from "react";
import { getMarketData } from "../api/coingecko";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
  Container,
  TableContainer,
  Typography,
  Stack,
  Pagination
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    getMarketData()
      .then((res) => {
        setCoins(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch cryptocurrency data.");
        setLoading(false);
      });
  }, []);

  const filteredCoins = coins?.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase().trim())
    )
  );

  // Sorted coins
  const sortedCoins = useMemo(() => {
    const sortableData = [...filteredCoins];
    if (!sortConfig.key) return sortableData;

    sortableData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }
      return sortConfig.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

    return sortableData;
  }, [filteredCoins, sortConfig]);

  // Handle sort
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortArrow = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };


  const paginatedCoins = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedCoins.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedCoins, currentPage]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Cryptocurrency Market
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          <TableContainer>
            {/* Search Input */}
            <div
              className="table-input"
              style={{
                width: "100%",
                padding: "0 8px 10px 8px",
                boxSizing: "border-box",
              }}
            >
              <input
                type="text"
                placeholder="Search coins..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)   
                    setCurrentPage(1)
                }}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <Table
              stickyHeader
              aria-label="crypto table"
              sx={{ width: "100%" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "10%" }}>#</TableCell>
                  <TableCell
                    sx={{ width: "20%", cursor: "pointer" }}
                    onClick={() => requestSort("name")}
                  >
                    Name {getSortArrow("name")}
                  </TableCell>
                  <TableCell
                    sx={{ width: "15%", cursor: "pointer" }}
                    onClick={() => requestSort("current_price")}
                  >
                    Price {getSortArrow("current_price")}
                  </TableCell>
                  <TableCell
                    sx={{ width: "15%", cursor: "pointer" }}
                    onClick={() => requestSort("market_cap")}
                  >
                    Market Cap {getSortArrow("market_cap")}
                  </TableCell>
                  <TableCell
                    sx={{ width: "20%", cursor: "pointer" }}
                    onClick={() => requestSort("price_change_percentage_24h")}
                  >
                    24h Change {getSortArrow("price_change_percentage_24h")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCoins?.map((coin, index) => (
                  <TableRow
                    key={coin.id}
                    hover
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/coin/${coin.id}`)}
                  >
                    <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <img src={coin.image} alt={coin.name} width="20" />
                        {coin.name}
                      </Box>
                    </TableCell>
                    <TableCell>
                      ${coin.current_price.toLocaleString()}
                    </TableCell>
                    <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
                    <TableCell>{coin.price_change_percentage_24h}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
           <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
            <Pagination
              count={Math.ceil(sortedCoins.length / itemsPerPage)}
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
              color="primary"
            />
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
