import { Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import Navbar from "./views/Navbar";
import SignUpPage from "./views/SignupPage";
import Profile from "./views/Profile";
import AdminPage from "./views/AdminPage";
import UserListPage from "./views/UserListPage";
import CreateClassTemplatePage from "./views/CreateClassTemplatePage";
import ActiveClassesPage from "./views/ActiveClassesPage";
import CreateCoachPage from "./views/CreateCoachPage";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/users" element={<UserListPage />} />
        <Route
          path="/admin/class-template"
          element={<CreateClassTemplatePage />}
        />
        <Route path="/admin/add-coach" element={<CreateCoachPage />} />
        <Route path="admin/classes" element={<ActiveClassesPage />} />
      </Routes>
    </>
  );
}

export default App;
