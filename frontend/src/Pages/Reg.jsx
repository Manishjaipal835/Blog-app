import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setName,
  setPhone,
  setPassword,
  regCallApi,
} from "../features/RegistrationSlice";
import { useEffect } from "react";

const Reg = () => {
  const dispatch = useDispatch();
  const { name, email, phone, password, status } = useSelector(
    (state) => state.regUser
  );
  const navi = useNavigate();

  function handlePhone(e) {
    const temp = e.target.value.replace(/[^0-9]/g, "");
    dispatch(setPhone(temp));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email.includes("@")) {
      window.alert("Fill the user data carefully");
      return;
    }

    dispatch(regCallApi({ name, email, phone, password }))
  .unwrap()
  .then(() => {
    navi("/Login");
  });

  }

useEffect(() => {
  if (status === "failed") {
    alert("Something went wrong");
  }

  if (status === "succeeded") {
    navi("/Login");
  }
}, [status, navi]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
  <form
    onSubmit={handleSubmit}
    className="w-[360px] bg-white rounded-2xl shadow-2xl px-6 py-7"
  >
    {/* Logo / Title */}
    <div className="text-center mb-6">
      <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
        R
      </div>
      <h2 className="text-xl font-semibold text-gray-800">
        Create Account
      </h2>
      <p className="text-xs text-gray-500 mt-1">
        Sign up to continue
      </p>
    </div>

    {/* Name */}
    <div className="mb-4">
      <label className="block text-xs font-medium text-gray-600 mb-1">
        Full Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => dispatch(setName(e.target.value))}
        placeholder="John wick"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    {/* Email */}
    <div className="mb-4">
      <label className="block text-xs font-medium text-gray-600 mb-1">
        Email
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => dispatch(setEmail(e.target.value))}
        placeholder="you@email.com"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    {/* Phone */}
    <div className="mb-4">
      <label className="block text-xs font-medium text-gray-600 mb-1">
        Phone
      </label>
      <input
        type="text"
        value={phone}
        minLength={10}
        maxLength={10}
        onChange={handlePhone}
        placeholder="10-digit number"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    {/* Password */}
    <div className="mb-5">
      <label className="block text-xs font-medium text-gray-600 mb-1">
        Password
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => dispatch(setPassword(e.target.value))}
        placeholder="have some faith"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    {/* Button */}
    <button
      type="submit"
      className="w-full rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
    >
      Register
    </button>

    {/* Footer */}
    <p className="mt-4 text-center text-xs text-gray-500">
      Already have an account?{" "}
      <span
        onClick={() => navi("/Login")}
        className="cursor-pointer font-medium text-indigo-600 hover:underline"
      >
        Login
      </span>
    </p>
  </form>
</div>

  );
};

export default Reg;

