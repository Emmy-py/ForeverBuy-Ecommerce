import { useState } from "react";
import NewsletterBox from "../components/NewsletterBox";

const Login = () => {
  const [mode, setMode] = useState("signup"); // "login" | "signup"

  return (
    <div className="border-t border-gray-300">
      <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
        {/* Title */}
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="text-3xl font-light">{mode === "signup" ? "Sign Up" : "Login"}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {/* Name field — Sign Up only */}
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Name"
            required
            className="w-full px-3 py-2 border border-gray-300 outline-none focus:border-gray-500"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full px-3 py-2 border border-gray-300 outline-none focus:border-gray-500"
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full px-3 py-2 border border-gray-300 outline-none focus:border-gray-500"
        />

        {/* Forgot password — Login only */}
        {mode === "login" && (
          <div className="w-full flex justify-end">
            <p className="text-xs text-gray-500 cursor-pointer hover:text-black">
              Forgot your password?
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 mt-2 hover:bg-gray-800 active:bg-gray-700 transition-colors"
        >
          {mode === "signup" ? "Create" : "Sign In"}
        </button>

        {/* Toggle */}
        {mode === "signup" ? (
          <p className="text-xs text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => setMode("login")}
              className="text-black underline cursor-pointer"
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className="text-xs text-gray-500">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => setMode("signup")}
              className="text-black underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        )}
      </form>

      <div className="mt-20">
        <NewsletterBox />
      </div>
    </div>
  );
};

export default Login;
