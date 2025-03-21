import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import HomePage from "../views/HomePage";
import LoginPage from "../views/LoginPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </>
  )
);

export default router;
