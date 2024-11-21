import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import UserProfile from "./pages/user-profile/UserProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          <Route path="profile/user-id" element={<UserProfile />} />
          <Route path="*" element={<></>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
