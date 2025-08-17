import { useState, createContext, useContext } from "react";
import { useModalContext } from "../../../contexts/ModalContext"; // Not available in this mock environment, so creating one
import useAuthStore from "../../../store/useAuthStore"; // Not available in this mock environment, so creating one
import Close from "../../../icons/Close"; // Not available in this mock environment, so creating one

// Mocked imports for a self-contained example
const ModalContext = createContext();
const useModalContextMock = () => useContext(ModalContext);
const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState("");
  return (
    <ModalContext.Provider value={{ activeModal, setActiveModal }}>
      {children}
    </ModalContext.Provider>
  );
};

const AuthStore = {
  user: null,
  setUser: (newUser) => {
    AuthStore.user = newUser;
    console.log("User updated:", newUser);
  },
};
const useAuthStoreMock = () => AuthStore;

const CloseIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const API = {
  post: async (url, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          data.email === "test@example.com" &&
          data.password === "password123"
        ) {
          resolve({ data: { token: "fake-token", user_id: "12345" } });
        } else {
          reject({ response: { data: { error: "Invalid credentials" } } });
        }
      }, 1000);
    });
  },
};

// Your Navigation component
function Navigation() {
  const { setActiveModal } = useModalContextMock();
  return (
    <nav className="text-primary-50 m-auto flex max-w-[90rem] justify-between px-24 text-lg/8 font-light max-xl:px-16 max-xl:text-base/loose max-lg:px-8 max-md:px-6">
      <a
        className="flex items-center gap-x-3 max-xl:gap-x-3 max-md:gap-x-2"
        href="#"
      >
        <p className="text-xl font-bold tracking-tight max-xl:text-xl max-md:text-lg/8 max-md:tracking-tighter">
          Rosetta
        </p>
      </a>
      <div className="flex items-center gap-x-3 max-lg:hidden">
        <button
          className="border-primary-50 transition-properties hover:bg-primary-50 hover:text-primary-1300 box-border cursor-pointer rounded-full border-2 px-8 py-3.5 text-lg/8 font-normal max-xl:px-6 max-xl:py-3 max-xl:text-base/loose"
          onClick={() => setActiveModal("login")}
        >
          Login
        </button>
        <button
          className="bg-primary-500 border-primary-500 text-primary-1300 primary-glow hover:border-primary-50 hover:bg-primary-50 primary-glow-hover transition-properties cursor-pointer rounded-full border-2 px-8 py-3.5 text-lg/8 font-normal max-xl:px-6 max-xl:py-3 max-xl:text-base/loose"
          onClick={() => setActiveModal("sign-up")}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}

// Your updated LoginModal component
const initialState = { email: "", password: "" };

function LoginModal({ show, onClose }) {
  const { setActiveModal } = useModalContextMock();
  const { setUser } = useAuthStoreMock();

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
      const res = await API.post("/login/", inputs);
      const data = res.data;
      setUser({ token: data.token, userId: data.user_id, email: inputs.email });
      localStorage.setItem("token", data.token);
      setSuccess(true);
      setTimeout(() => {
        setActiveModal("");
        // Redirect to the dashboard after successful login
        // window.location.href = "/dashboard";
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

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <section className="grid max-w-3xl grid-cols-2 overflow-hidden rounded-2xl max-sm:w-96 max-sm:grid-cols-1">
        <div className="bg-primary-1300 flex flex-col justify-center gap-y-4 bg-[url('https://placehold.co/600x400/121212/ffffff?text=Welcome+Back!')] bg-repeat p-10 text-center max-md:px-6 max-md:py-8 max-sm:hidden">
          <h4 className="text-primary-50 text-4xl/12 font-bold tracking-tight">
            Welcome back!
          </h4>
          <p className="text-primary-100 text-lg/8 max-md:text-base/loose">
            Log in to access your bookmarks and more.
          </p>
        </div>
        <div className="bg-primary-1400 flex flex-col justify-between gap-y-24 p-10 max-md:px-6 max-md:py-8 max-sm:gap-y-16">
          <button
            onClick={onClose}
            className="border-primary-75 hover:bg-primary-75 group transition-properties ml-auto w-fit cursor-pointer rounded-2xl border-2 p-3"
          >
            <CloseIcon
              className="stroke-primary-75 group-hover:stroke-primary-1300 transition-properties max-md:h-4 max-md:w-4"
              width={2}
            />
          </button>
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
            {error && (
              <p className="text-center text-sm text-red-500">{error}</p>
            )}
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
    </div>
  );
}

// Main App component
export default function App() {
  const { activeModal, setActiveModal } = useModalContextMock();
  return (
    <ModalProvider>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4 font-sans text-white">
        <style jsx="true">{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
        `}</style>
        <Navigation />
        <h1 className="mt-10 text-4xl font-bold">Welcome to Rosetta</h1>
        <p className="mt-4 text-lg text-gray-400">
          Click the Login button to see the modal!
        </p>

        {activeModal === "login" && (
          <LoginModal show={true} onClose={() => setActiveModal("")} />
        )}
      </div>
    </ModalProvider>
  );
}
