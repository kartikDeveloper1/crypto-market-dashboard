import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
      bgcolor: 'grey.200',
      py: 2,
      px: 3,                   
      textAlign: 'center',
  }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} Nimo Industries Pty Ltd. |{' '}
        <Link href="https://nimoindustries.com" target="_blank" rel="noopener noreferrer">
          nimoindustries.com
        </Link>
      </Typography>
    </Box>
  );
}
