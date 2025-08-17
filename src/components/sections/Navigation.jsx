import Logo from "../icons/Logo";
import MobileMenuIcon from "./MobileMenu/MobileMenuIcon";
import { useModalContext } from "../../contexts/ModalContext";
import useAuthStore from "../../store/useAuthStore";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Stack,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { deepPurple } from "@mui/material/colors";
import { useState } from "react";

export default function Navigation() {
  const { setActiveModal } = useModalContext();
  const { user, logout } = useAuthStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  // Avatar menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#0e2e2e" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <RouterLink to="/" style={{ textDecoration: "none" }}>
          <Typography variant="h6" color="inherit">
            Rosetta
          </Typography>
        </RouterLink>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Right Side */}
          {!isMobile && (
            <Stack direction="row" spacing={2} alignItems="center">
              {user ? (
                <>
                  <Button
                    component={RouterLink}
                    to="/dashboard"
                    variant="contained"
                    sx={{
                      bgcolor: "#44e5e7",
                      color: "#061212",
                      "&:hover": { bgcolor: "#36b7b9" },
                      borderRadius: "9999px",
                    }}
                  >
                    Dashboard
                  </Button>
                  {/* Avatar with dropdown */}
                  <Avatar
                    sx={{ bgcolor: deepPurple[500], cursor: "pointer" }}
                    onClick={handleAvatarClick}
                  >
                    {user.email[0].toUpperCase()}
                  </Avatar>

                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <Box sx={{ px: 2, py: 1 }}>
                      <Typography variant="subtitle1">{user.email}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        User ID: {user.userId}
                      </Typography>
                    </Box>
                    <Divider />
                    <MenuItem
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#ecfcfd",
                      color: "#ecfcfd",
                      "&:hover": { bgcolor: "#ecfcfd", color: "#061212" },
                      borderRadius: "9999px",
                    }}
                    onClick={() => setActiveModal("login")}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#44e5e7",
                      color: "#061212",
                      "&:hover": { bgcolor: "#ecfcfd", color: "#061212" },
                      borderRadius: "9999px",
                      boxShadow: "0 0 25px rgba(68, 229, 231, 0.2)",
                    }}
                    onClick={() => setActiveModal("sign-up")}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </Stack>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && <MobileMenuIcon />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
