import { useAuthStore } from "../../store/useAuthStore";
import { useEffect, useState } from "react";
import API from "../../utils/api"; // Adjust path as needed

export default function Dashboard() {
  const { user } = useAuthStore();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <p className="text-red-500">Please log in to view your dashboard.</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
      <h2 className="mb-2 text-xl">Welcome, {user.email}!</h2>
      <p className="mb-4">User ID: {user.userId}</p>
      <h3 className="mb-2 text-lg">Your Bookmarks</h3>
      {loading ? (
        <p>Loading bookmarks...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <ul className="list-disc pl-5">
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id}>
              {bookmark.title || bookmark.url} - {bookmark.url}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        className="bg-primary-500 hover:bg-primary-600 text-primary-1300 mt-4 rounded-full px-6 py-2"
      >
        Logout
      </button>
    </div>
  );
}
