import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import API from "../../utils/api";
import {
  AppBar,
  Toolbar,
  Typography,
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
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function Dashboard() {
  const { user, token, logout, initialize } = useAuthStore();
  const [authLoaded, setAuthLoaded] = useState(false); // Track auth initialization
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Bookmark creation state
  const [showForm, setShowForm] = useState(false);
  const [newBookmark, setNewBookmark] = useState({ url: "", title: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  // Avatar menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/");
  };

  // Initialize auth on client
  useEffect(() => {
    initialize();
    setAuthLoaded(true);
  }, [initialize]);

  // Fetch bookmarks after user and token are ready
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!token) return;
      setLoading(true);
      setError(null);
      try {
        const res = await API.get("/bookmarks/", {
          headers: { Authorization: `Token ${token}` },
        });
        setBookmarks(res.data);
      } catch (err) {
        setError("Failed to load bookmarks.");
        console.error("Error fetching bookmarks:", err);
      } finally {
        setLoading(false);
      }
    };

    if (authLoaded && user) {
      fetchBookmarks();
    }
  }, [authLoaded, user, token]);

  // Handle bookmark creation
  const handleAddBookmark = async () => {
    if (!newBookmark.url) {
      setFormError("URL is required.");
      return;
    }
    setFormLoading(true);
    setFormError(null);
    try {
      const res = await API.post("/bookmarks/create/", newBookmark, {
        headers: { Authorization: `Token ${token}` },
      });
      setBookmarks([...bookmarks, res.data]);
      setShowForm(false);
      setNewBookmark({ url: "", title: "" });
    } catch (err) {
      setFormError(
        err.response?.data?.error || "Failed to add bookmark. Try again.",
      );
      console.error("Error adding bookmark:", err);
    } finally {
      setFormLoading(false);
    }
  };

  // Wait until auth is initialized
  if (!authLoaded) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

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

      <Container sx={{ mt: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Your Bookmarks</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowForm(true)}
          >
            Add Bookmark
          </Button>
        </Box>

        <Dialog open={showForm} onClose={() => setShowForm(false)}>
          <DialogTitle>Add New Bookmark</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="URL"
              type="url"
              fullWidth
              value={newBookmark.url}
              onChange={(e) =>
                setNewBookmark({ ...newBookmark, url: e.target.value })
              }
              error={!!formError}
              helperText={formError}
            />
            <TextField
              margin="dense"
              label="Title (Optional)"
              type="text"
              fullWidth
              value={newBookmark.title}
              onChange={(e) =>
                setNewBookmark({ ...newBookmark, title: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowForm(false)}>Cancel</Button>
            <Button
              onClick={handleAddBookmark}
              disabled={formLoading}
              color="primary"
            >
              {formLoading ? <CircularProgress size={24} /> : "Add"}
            </Button>
          </DialogActions>
        </Dialog>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : bookmarks.length === 0 ? (
          <Typography>No bookmarks yet.</Typography>
        ) : (
          <List
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            }}
          >
            {bookmarks.map((bookmark) => (
              <Paper
                key={bookmark.id}
                sx={{
                  p: 2,
                  bgcolor: "#144545",
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        component="a"
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: "#fff",
                          textDecoration: "none",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {bookmark.title || bookmark.url}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" sx={{ color: "#a0e0e0" }}>
                        {bookmark.url}
                      </Typography>
                    }
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
