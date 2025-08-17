// Dashboard.jsx
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
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function Dashboard() {
  const { user } = useAuthStore();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
          <Link to="/">
            <Typography variant="h6">Rosetta</Typography>
          </Link>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: deepPurple[500] }}>
              {user.email[0].toUpperCase()}
            </Avatar>
            <Typography>{user.email}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              Logout
            </Button>
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
