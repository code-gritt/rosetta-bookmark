import useAuthStore from "../store/useAuthStore";
import API from "../utils/api";

function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);

  async function handleLogout() {
    try {
      await API.post("logout/");
    } catch (e) {
      console.error("Logout request failed", e);
    }
    logout();
  }

  return <button onClick={handleLogout}>Logout</button>;
}
