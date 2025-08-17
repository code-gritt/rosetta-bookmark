import { useState } from "react";
import {
  Drawer,
  Box,
  Button,
  Typography,
  IconButton,
  Stack,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useModalContext } from "../../../contexts/ModalContext";
import { useMobileMenuContext } from "../../../contexts/MobileMenuContext";
import useAuthStore from "../../../store/useAuthStore";
import { Link as RouterLink } from "react-router-dom";

export default function MobileMenu() {
  const { setActiveModal } = useModalContext();
  const { mobileMenuOpened, setMobileMenuOpened } = useMobileMenuContext();
  const { user, logout } = useAuthStore();

  const handleLogin = () => {
    setActiveModal("login");
    setMobileMenuOpened(false);
  };

  const handleGetStarted = () => {
    setActiveModal("sign-up");
    setMobileMenuOpened(false);
  };

  return (
    <Drawer
      anchor="right"
      open={mobileMenuOpened}
      onClose={() => setMobileMenuOpened(false)}
      PaperProps={{
        sx: {
          width: 280,
          bgcolor: "#061212", // primary-1400
          backgroundImage: "url('/src/assets/Noise.webp')",
          backgroundRepeat: "repeat",
          borderRadius: 3,
          p: 3,
        },
      }}
      BackdropProps={{
        sx: {
          bgcolor: "rgba(6, 18, 18, 0.5)", // primary-1300/50
          backdropFilter: "blur(5px)",
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        {/* Close Button */}
        <Box mb={2}>
          <IconButton
            onClick={() => setMobileMenuOpened(false)}
            sx={{
              border: "2px solid #bfc5c9", // primary-75
              "&:hover": { bgcolor: "#bfc5c9" },
            }}
          >
            <CloseIcon sx={{ color: "#bfc5c9" }} />
          </IconButton>
        </Box>

        {/* Menu Items */}
        <Stack spacing={2}>
          {user ? (
            <>
              <Typography color="white">{user.email}</Typography>
              <Button
                component={RouterLink}
                to="/dashboard"
                variant="contained"
                sx={{
                  bgcolor: "#44e5e7",
                  color: "#061212",
                  borderRadius: "9999px",
                  "&:hover": { bgcolor: "#36b7b9" },
                }}
              >
                Dashboard
              </Button>
              <Button
                onClick={logout}
                variant="contained"
                sx={{
                  bgcolor: "#44e5e7",
                  color: "#061212",
                  borderRadius: "9999px",
                  "&:hover": { bgcolor: "#36b7b9" },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleLogin}
                variant="outlined"
                sx={{
                  borderColor: "#ecfcfd",
                  color: "#ecfcfd",
                  borderRadius: "9999px",
                  "&:hover": { bgcolor: "#ecfcfd", color: "#061212" },
                }}
              >
                Login
              </Button>
              <Button
                onClick={handleGetStarted}
                variant="contained"
                sx={{
                  bgcolor: "#44e5e7",
                  color: "#061212",
                  borderRadius: "9999px",
                  boxShadow: "0 0 25px rgba(68, 229, 231, 0.2)",
                  "&:hover": { bgcolor: "#ecfcfd", color: "#061212" },
                }}
              >
                Get Started
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </Drawer>
  );
}
