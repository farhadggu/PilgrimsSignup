import "./App.css";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import LotterySignupPage from "./pages/LotterySignupPage";
import LotteryWinnersSignupPage from "./pages/LotteryWinnersSignupPage";

document.addEventListener("wheel", function (event) {
  if (document.activeElement.type === "number") {
    document.activeElement.blur();
  }
});

function App() {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />
        <Route
          path="/karbala-signups"
          element={
            <>
              <Navbar />
              <LotterySignupPage />
            </>
          }
        />
        <Route
          path="/karbala-winners-signups"
          element={
            <>
              <Navbar />
              <LotteryWinnersSignupPage />
            </>
          }
        />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
