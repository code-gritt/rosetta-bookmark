import Logo from "../icons/Logo";
import MobileMenuIcon from "./MobileMenu/MobileMenuIcon";
import { useModalContext } from "../../contexts/ModalContext";
import useAuthStore from "../../store/useAuthStore";
import { Link, Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Stack,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Navigation() {
  const { setActiveModal } = useModalContext();
  const { user, logout } = useAuthStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg")); // hides right side on smaller screens

  return (
    <AppBar position="static" sx={{ bgcolor: "#0e2e2e" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">
          <Typography variant="h6">Rosetta</Typography>
        </Link>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Right Side */}
          {!isMobile && (
            <Stack direction="row" spacing={2} alignItems="center">
              {user ? (
                <>
                  <Typography variant="body2">{user.email}</Typography>
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
                  <Button
                    onClick={logout}
                    variant="contained"
                    sx={{
                      bgcolor: "#44e5e7",
                      color: "#061212",
                      "&:hover": { bgcolor: "#36b7b9" },
                      borderRadius: "9999px",
                    }}
                  >
                    Logout
                  </Button>
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
