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

    dispatch(regCallApi({ name, email, phone, password }));
  }

  useEffect(() => {
    if (status === 404) {
      window.alert("Something went wrong");
    }

    if (status === 200 || status === 201) {
      navi("/Login");
    }
  }, [status, navi]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
          Create Account
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your email"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone
          </label>
          <input
            type="text"
            minLength={10}
            maxLength={10}
            value={phone}
            onChange={handlePhone}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="10-digit phone number"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Create a password"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer hover:underline"
            onClick={() => navi("/Login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Reg;
