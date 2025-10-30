import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../store/authSlice";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await api.post("api/auth/login", { email, password });

      // 🎯 Extract token & role
      const token = res.data.token;
       let role = "USER";
    if (res.data.user) role = res.data.user.role;
    else if (res.data.company) role = res.data.company.role; // fallback if backend doesn't send role

      dispatch(setCredentials({ token, email, role }));

      // 🎯 Redirect based on role
      if (role === "COMPANY") navigate("/company/dashboard");
      else navigate("/home");

    } catch (err) {
      console.error(err);
      alert("Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <form
        onSubmit={handleLogin}
        className="w-96 p-8 rounded-2xl bg-black/30 backdrop-blur-md shadow-lg flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
          Login
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
            />
          </svg>
        </h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <button
          type="submit"
          className="p-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
