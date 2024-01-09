import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";

function App() {
  const { isLoggedIn } = useAppContext()
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>
          <p>Home page</p>
        </Layout>} />
        <Route path="/search" element={<Layout>
          <p>Search page</p>
        </Layout>} />
        <Route path="/sign-in" element={<Layout>
          <SignIn />
        </Layout>} />
        <Route path="/register" element={<Layout>
          <Register />
        </Layout>} />

        {isLoggedIn && <>
          <Route path="/add-hotel" element={<Layout><AddHotel /></Layout>} /></>}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
