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
  IconButton,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Dashboard() {
  const { user, token, logout, initialize } = useAuthStore();
  const [authLoaded, setAuthLoaded] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showBulkForm, setShowBulkForm] = useState(false);
  const [bulkUrls, setBulkUrls] = useState("");

  // Bookmark form state
  const [showForm, setShowForm] = useState(false);
  const [newBookmark, setNewBookmark] = useState({
    id: null,
    url: "",
    title: "",
  });
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

  // Initialize auth
  useEffect(() => {
    initialize();
    setAuthLoaded(true);
  }, [initialize]);

  // Fetch bookmarks once on mount
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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (authLoaded && user) fetchBookmarks();
  }, [authLoaded, user, token]);

  // Save bookmark (add/edit)
  const handleSaveBookmark = async () => {
    const urlPattern =
      /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;

    if (!newBookmark.url || !urlPattern.test(newBookmark.url)) {
      setFormError("Please enter a valid URL (e.g., https://example.com).");
      return;
    }

    setFormLoading(true);
    setFormError(null);

    try {
      let res;
      if (newBookmark.id) {
        res = await API.put(
          `/bookmarks/${newBookmark.id}/update/`,
          {
            url: newBookmark.url,
            title: newBookmark.title,
          },
          {
            headers: { Authorization: `Token ${token}` },
          },
        );
      } else {
        res = await API.post(
          "/bookmarks/create/",
          {
            url: newBookmark.url,
            title: newBookmark.title,
          },
          {
            headers: { Authorization: `Token ${token}` },
          },
        );
      }

      setBookmarks((prev) => {
        if (newBookmark.id) {
          return prev.map((b) => (b.id === newBookmark.id ? res.data : b));
        } else {
          return [...prev, res.data];
        }
      });

      setShowForm(false);
      setNewBookmark({ id: null, url: "", title: "" });
    } catch (err) {
      setFormError(
        err.response?.data?.error || "Failed to save bookmark. Try again.",
      );
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  // Edit bookmark
  const handleEditBookmark = (bookmark) => {
    setNewBookmark({
      id: bookmark.id,
      url: bookmark.url,
      title: bookmark.title,
    });
    setShowForm(true);
  };

  // Delete bookmark
  const handleDeleteBookmark = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bookmark?"))
      return;

    try {
      await API.delete(`/bookmarks/${id}/delete/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setError("Failed to delete bookmark.");
      console.error(err);
    }
  };

  // Render loading/auth states
  if (!authLoaded) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  const handleBulkSubmit = async () => {
    if (!bulkUrls) return;
    try {
      const urls = bulkUrls.split(",").map((u) => u.trim());
      const res = await API.post(
        "/bookmarks/bulk-create/",
        { urls },
        {
          headers: { Authorization: `Token ${token}` },
        },
      );
      setBookmarks([...bookmarks, ...res.data.bookmarks]);
      setShowBulkForm(false);
      setBulkUrls("");
    } catch (err) {
      setError("Failed to add bulk bookmarks.");
      console.error(err);
    }
  };

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
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowBulkForm(true)}
          >
            Bulk Add Bookmarks
          </Button>
        </Box>

        {/* Bookmark Form Dialog */}
        <Dialog open={showForm} onClose={() => setShowForm(false)}>
          <DialogTitle>
            {newBookmark.id ? "Edit Bookmark" : "Add New Bookmark"}
          </DialogTitle>
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
              onClick={handleSaveBookmark}
              disabled={formLoading}
              color="primary"
            >
              {formLoading ? (
                <CircularProgress size={24} />
              ) : newBookmark.id ? (
                "Save"
              ) : (
                "Add"
              )}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={showBulkForm} onClose={() => setShowBulkForm(false)}>
          <DialogTitle>Add Multiple Bookmarks</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="URLs (comma-separated)"
              type="text"
              fullWidth
              value={bulkUrls}
              onChange={(e) => setBulkUrls(e.target.value)}
              helperText="e.g., https://example.com, https://test.com"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowBulkForm(false)}>Cancel</Button>
            <Button onClick={handleBulkSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Bookmarks List */}
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
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <ListItem sx={{ px: 0, flexGrow: 1 }}>
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
                        <Typography variant="body2" sx={{ color: "#ddd" }}>
                          {bookmark.url}
                        </Typography>
                      }
                    />
                  </ListItem>

                  <Box>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditBookmark(bookmark)}
                      sx={{ color: "#fff" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteBookmark(bookmark.id)}
                      sx={{ color: "#f44336" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            ))}
          </List>
        )}
      </Container>
    </Box>
  );
}
