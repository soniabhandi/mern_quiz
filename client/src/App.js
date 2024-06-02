import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Quiz from "./components/Quiz";
import { QuizContext } from "./contexts/quiz";

const Navbar = () => {
  const [state, dispatch] = useContext(QuizContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link to="/" className="text-white text-lg font-bold">
            Quizzie App
          </Link>
        </div>
        <div>
          {!state.isAuthenticated ? (
            <>
              <Link to="/login" className="text-white px-3">
                Login
              </Link>
              <Link to="/register" className="text-white px-3">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/quiz" className="text-white px-3">
                Quiz
              </Link>
              <button onClick={handleLogout} className="text-white px-3">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route
            path="/"
            element={
              <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-3xl font-bold">Welcome to Quizzie</h1>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
