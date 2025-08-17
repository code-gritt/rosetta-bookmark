import { useState } from "react";
import {
  Drawer,
  Box,
  Button,
  Typography,
  IconButton,
  Stack,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useModalContext } from "../../../contexts/ModalContext";
import { useMobileMenuContext } from "../../../contexts/MobileMenuContext";
import useAuthStore from "../../../store/useAuthStore";
import { Link as RouterLink } from "react-router-dom";
import { deepPurple } from "@mui/material/colors";

export default function MobileMenu() {
  const { setActiveModal } = useModalContext();
  const { mobileMenuOpened, setMobileMenuOpened } = useMobileMenuContext();
  const { user, logout } = useAuthStore();

  const [anchorEl, setAnchorEl] = useState(null);
  const openAvatarMenu = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setActiveModal("login");
    setMobileMenuOpened(false);
  };

  const handleGetStarted = () => {
    setActiveModal("sign-up");
    setMobileMenuOpened(false);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpened(false);
    handleAvatarClose();
  };

  return (
    <Drawer
      anchor="right"
      open={mobileMenuOpened}
      onClose={() => setMobileMenuOpened(false)}
      PaperProps={{
        sx: {
          width: 280,
          bgcolor: "#061212",
          backgroundImage: "url('/src/assets/Noise.webp')",
          backgroundRepeat: "repeat",
          borderRadius: 3,
          p: 3,
        },
      }}
      BackdropProps={{
        sx: {
          bgcolor: "rgba(6, 18, 18, 0.5)",
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
        <Box mb={3}>
          <IconButton
            onClick={() => setMobileMenuOpened(false)}
            sx={{
              border: "2px solid #bfc5c9",
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
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton onClick={handleAvatarClick}>
                  <Avatar sx={{ bgcolor: deepPurple[500] }}>
                    {user.email[0].toUpperCase()}
                  </Avatar>
                </IconButton>
                <Typography color="white">{user.email}</Typography>
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={openAvatarMenu}
                onClose={handleAvatarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem
                  component={RouterLink}
                  to="/dashboard"
                  onClick={handleAvatarClose}
                >
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                onClick={handleLogin}
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: "#ecfcfd",
                  color: "#ecfcfd",
                  borderRadius: "9999px",
                  "&:hover": { bgcolor: "#ecfcfd", color: "#061212" },
                  mb: 1,
                }}
              >
                Login
              </Button>
              <Button
                onClick={handleGetStarted}
                variant="contained"
                fullWidth
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
