import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCoinDetails } from "../api/coingecko";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import { Typography, Box, Link, Card, CardContent, Divider } from "@mui/material";

export default function CryptoDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCoinDetails(id)
      .then((res) => {
        setCoin(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch coin details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

 return (
  <Box
    sx={{
      minHeight: 'calc(100vh - 128px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2
    }}
  >
    <Card sx={{ maxWidth: 500, width: '100%', textAlign: 'center', p: 2 }}>
      <img
        src={coin.image.large}
        alt={coin.name}
        width="120"
        style={{ margin: '0 auto' }}
      />
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {coin.name} ({coin.symbol.toUpperCase()})
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6" sx={{ mb: 1 }}>
          Price: ${coin.market_data.current_price.usd.toLocaleString()}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {coin.description.en.split(". ")[0] + "."}
        </Typography>
        <Link
          href={coin.links.homepage[0]}
          target="_blank"
          rel="noopener"
          underline="hover"
        >
          Official Website
        </Link>
      </CardContent>
    </Card>
  </Box>
);
}
