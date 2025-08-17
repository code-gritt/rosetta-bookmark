import { useState } from "react";
import CloseIcon from "../../icons/Close"; // Assuming this is the correct path
import { useModalContext } from "../../../contexts/ModalContext";
import useAuthStore from "../../../store/useAuthStore";
import API from "../../../utils/api";
import Close from "../../icons/Close";

const initialState = { email: "", password: "" };

function LoginModal({ onClose }) {
  const { setActiveModal } = useModalContext();
  const { setUser } = useAuthStore();
  const [inputs, setInputs] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await API.post("/login/", {
        email: inputs.email,
        password: inputs.password,
      });
      const data = res.data;
      setUser({
        token: data.token,
        userId: data.user_id,
        email: data.email,
      });
      localStorage.setItem("token", data.token);
      setSuccess(true);
      setTimeout(() => {
        setActiveModal("");
        window.location.href = "/dashboard";
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Login failed. Please check your credentials.",
      );
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="grid max-w-3xl grid-cols-2 overflow-hidden rounded-2xl max-sm:w-96 max-sm:grid-cols-1">
      {/* Left side (Decoration) */}
      <div className="bg-primary-1300 flex flex-col justify-center gap-y-4 bg-[url('../src/assets/Noise.webp')] bg-repeat p-10 text-center max-md:px-6 max-md:py-8 max-sm:hidden">
        <h4 className="text-primary-50 text-4xl/12 font-bold tracking-tight">
          Login
        </h4>
      </div>

      {/* Right side (Form) */}
      <div className="bg-primary-1400 flex flex-col justify-between gap-y-24 bg-[url('../src/assets/Noise.webp')] bg-repeat p-10 max-md:px-6 max-md:py-8 max-sm:gap-y-16">
        {/* Close button */}

        <button
          onClick={() => setActiveModal("")}
          className="border-primary-75 hover:bg-primary-75 group transition-properties ml-auto w-fit cursor-pointer rounded-2xl border-2 p-3"
        >
          <Close
            className="stroke-primary-75 group-hover:stroke-primary-1300 transition-properties max-md:h-4 max-md:w-4"
            width={2}
          />
        </button>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between gap-y-24 max-sm:gap-y-16"
        >
          <div className="text-primary-50 flex flex-col gap-y-6 text-lg/8 font-semibold tracking-tight max-md:font-normal">
            <label>
              Email
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                placeholder="janedoe@gmail.com"
                className="bg-primary-75 placeholder-primary-1500 text-primary-1300 mt-2 block w-full rounded-full px-8 py-4 font-normal placeholder:text-base placeholder:font-light placeholder:opacity-20 max-md:px-6 max-md:py-3"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                placeholder="************"
                className="bg-primary-75 placeholder-primary-1500 text-primary-1300 mt-2 block w-full rounded-full px-8 py-4 font-normal placeholder:text-base placeholder:font-light placeholder:opacity-20 max-md:px-6 max-md:py-3"
              />
            </label>
          </div>
          {error && <p className="text-center text-sm text-red-500">{error}</p>}
          {success && (
            <p className="text-center text-sm text-green-500">
              Login successful! Redirecting...
            </p>
          )}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-500 primary-glow-hover transition-properties w-full cursor-pointer rounded-full py-4 text-lg/8 max-md:px-6 max-md:py-3 max-md:text-base/loose"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default LoginModal;
