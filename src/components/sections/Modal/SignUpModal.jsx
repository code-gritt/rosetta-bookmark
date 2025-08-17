import { useState } from "react";
import Close from "../../icons/Close";
import Checkmark from "../../icons/Checkmark";
import { useModalContext } from "../../../contexts/ModalContext";
import useAuthStore from "../../../store/useAuthStore";
import API from "../../../utils/api";

const initialState = { email: "", password: "" };

export default function SignUpModal() {
  const { setActiveModal } = useModalContext();
  const { setUser } = useAuthStore();
  const [inputs, setInputs] = useState(initialState);
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checked) {
      // Use a custom modal or message box instead of alert()
      // For this example, we'll use a simple console log
      console.log("Please agree to the terms.");
      return;
    }

    try {
      // Use the new API client for the POST request
      const res = await API.post("/signup/", inputs);

      // No need to check res.ok, axios throws an error for non-2xx status codes
      // Axios response data is directly in res.data
      const data = res.data;

      // Store token + user info in Zustand
      setUser({ token: data.token, userId: data.user_id, email: inputs.email });
      localStorage.setItem("token", data.token);

      console.log("Signup successful!"); // Replace with a success message box
      setInputs(initialState);
      setActiveModal("");
    } catch (err) {
      console.error("Signup failed:", err.response?.data?.error || err.message);
      // Use a custom modal or message box for the error
      console.log("Something went wrong, try again later.");
    }
  };

  return (
    <section className="grid max-w-3xl grid-cols-2 max-sm:w-96 max-sm:grid-cols-1">
      {/* Left side */}
      <div className="bg-primary-1300 flex flex-col justify-center gap-y-4 bg-[url('../src/assets/Noise.webp')] bg-repeat p-10 text-center max-md:px-6 max-md:py-8 max-sm:hidden">
        <h4 className="text-primary-50 text-4xl/12 font-bold tracking-tight">
          Lets Get You Signed Up
        </h4>
        <p className="text-primary-100 text-lg/8 max-md:text-base/loose">
          No charges, no fees. Get note taking in minutes!
        </p>
      </div>

      {/* Right side */}
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
                onChange={handleChange}
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
                onChange={handleChange}
                placeholder="************"
                className="bg-primary-75 placeholder-primary-1500 text-primary-1300 mt-2 block w-full rounded-full px-8 py-4 font-normal placeholder:text-base placeholder:font-light placeholder:opacity-20 max-md:px-6 max-md:py-3"
              />
            </label>
          </div>

          {/* Checkbox + Submit */}
          <div>
            <div
              onClick={() => setChecked((c) => !c)}
              className="m-auto mb-4 w-fit cursor-pointer gap-x-2 max-sm:mb-3"
            >
              <button
                type="button"
                className={`border-primary-100 transition-properties mr-2 inline-flex h-4 w-4 items-center justify-center rounded-sm border-2 ${
                  checked ? "bg-primary-100" : ""
                }`}
              >
                <Checkmark className="stroke-primary-1500" />
              </button>
              <p className="text-primary-100 inline cursor-pointer text-sm">
                I agree to all terms
              </p>
            </div>

            <button
              type="submit"
              className="bg-primary-500 primary-glow-hover transition-properties w-full cursor-pointer rounded-full py-4 text-lg/8 max-md:px-6 max-md:py-3 max-md:text-base/loose"
            >
              Get Started
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
