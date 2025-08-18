import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(
      "your-paypal-email@example.com",
    )}&amount=10&currency_code=USD&return=https://your-app.com/paypal-callback`;
    window.location.href = paypalUrl;
  };

  return (
    <Container sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Upgrade Your Plan
      </Typography>
      <Typography variant="body1" paragraph>
        You’ve run out of credits. Upgrade to get 1000 credits for just $10!
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUpgrade}
          sx={{ borderRadius: "9999px" }}
        >
          Upgrade Now ($10)
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 2, color: "#a0e0e0" }}>
        After payment, you’ll be redirected back and receive 1000 credits.
      </Typography>
    </Container>
  );
}
