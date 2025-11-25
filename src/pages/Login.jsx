// import { useState } from "react";
// import instance from "../config/axiosConfig";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthProvider";


// function Login() {
//   const [data, setData] = useState({
//     username: "",
//     password: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isError, setIsError] = useState(null);
//   const navigate = useNavigate();
//   const { checkAuthStatus } = useAuth();

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       setIsSubmitting(true);
//       const response = await instance.post("/auth/login", data, {
//         withCredentials: true,
//       });
//       console.log(response);
//       if (response.status === 200) {
//         await checkAuthStatus();
//         navigate("/home");
//       }
//     } catch (error) {
//       console.log(error);
//       setIsError(error.message);
//       setIsSubmitting(false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <form className="auth-form" onSubmit={handleSubmit}>
//       <h2 className="auth-title">Login to Ecommerce</h2>

//       {isError && <p style={{ color: "red", textAlign: "center" }}>{isError}</p>}

//       <div className="auth-group">
//         <input
//           type="text"
//           name="username"
//           id="username"
//           placeholder="Username"
//           value={data.username}
//           onChange={handleChange}
//           className="auth-input"
//           required
//         />
//       </div>

//       <div className="auth-group">
//         <input
//           type="password"
//           name="password"
//           id="password"
//           placeholder="Password"
//           value={data.password}
//           onChange={handleChange}
//           className="auth-input"
//           required
//         />
//       </div>

//       <button type="submit" className="auth-btn" disabled={isSubmitting}>
//         {isSubmitting ? "Logging in..." : "Login"}
//       </button>

//       <p className="auth-text">
//         New user?{" "}
//         <Link to="/register" className="auth-link">
//           Register here
//         </Link>
//       </p>
//     </form>
//   );
// }

// export default Login;









import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../pages/Firebase.js";
import instance from "../config/axiosConfig";
import { useAuth } from "../contexts/AuthProvider";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();

  console.log(useLocation());

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setIsError(null);

      // Firebase login
      await signInWithEmailAndPassword(auth, data.email, data.password);

      // Save the Firebase ID token to localStorage for later use
      try {
        const idToken = await auth.currentUser.getIdToken();
        localStorage.setItem('firebaseToken', idToken);

        // Exchange Firebase ID token with backend to set an HttpOnly session cookie (if backend supports it)
        await instance.post(
          "/auth/firebaseLogin",
          { idToken },
          { withCredentials: true }
        );
        // Let AuthProvider re-check server session if needed
        await checkAuthStatus();
      } catch (err) {
        // backend exchange may fail if the endpoint doesn't exist; still proceed with client-side auth
        console.log("Backend token exchange failed:", err.response?.data || err.message);
      }

      navigate("/"); // redirect on success
    } catch (error) {
      setIsError(error);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="login-page">
        {isError && <p className="error-text">{isError.message}</p>}

        <div className="login-card">
          {/* Left Panel */}
          <div className="login-left">
            <div>
              <h2>
                Get Started
                <br />
                with Us
              </h2>
              <p>Complete these easy steps to register your account.</p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="login-right">
            <h2>Login to Account</h2>
            <p>Enter your email and password to login.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="eg. john@gmail.com"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  id="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                />
                <span className="form-hint">
                  Must be at least 6 characters.
                </span>
              </div>

              <button type="submit" disabled={isSubmitting} className="login-btn">
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className="bottom-text">
                Don't have an account? <Link to="/register">Register Here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;