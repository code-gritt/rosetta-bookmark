import { useEffect, useState } from "react";
import API from "../../utils/api";
import useAuthStore from "../../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";

// MUI Components
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
  Box,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Avatar menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/");
  };

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user?.token) return;
      try {
        const res = await API.get("/bookmarks/", {
          headers: { Authorization: `Token ${user.token}` },
        });
        setBookmarks(res.data);
      } catch (err) {
        setError("Failed to load bookmarks.");
        console.error("Error fetching bookmarks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, [user]);

  if (!user) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography color="error">
          Please log in to view your dashboard.
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#071717", color: "#fff" }}>
      {/* Header / Navigation */}
      <AppBar position="static" sx={{ bgcolor: "#0e2e2e" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h6">Rosetta</Typography>
          </Link>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="h6" gutterBottom>
          Welcome, {user.email}!
        </Typography>
        <Typography gutterBottom>User ID: {user.userId}</Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Your Bookmarks
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : bookmarks.length === 0 ? (
          <Typography>No bookmarks yet.</Typography>
        ) : (
          <List>
            {bookmarks.map((bookmark) => (
              <Paper key={bookmark.id} sx={{ mb: 2, p: 2, bgcolor: "#144545" }}>
                <ListItem>
                  <ListItemText
                    primary={bookmark.title || bookmark.url}
                    secondary={bookmark.url}
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        )}
      </Container>
    </Box>
  );
}
