import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, Login, Profile, Register, ResetPassword } from "./pages";
import FriendRequestPage from "./pages/FriendRequestPage";
import FriendSuggestionPage from "./pages/FriendSuggestionPage";

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  // Check if user has a valid token
  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

function App() {
  return (
    <div className="w-full min-h-[100vh]">
      <Routes>
        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id?" element={<Profile />} />
          <Route path="/friend-requests" element={<FriendRequestPage />} />
          <Route path="/friend-suggestions" element={<FriendSuggestionPage />} />
        </Route>

        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
