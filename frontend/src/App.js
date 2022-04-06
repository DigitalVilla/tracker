import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components";
import {
  Protected,
  Unprotected,
  View,
  Home,
  Panel,
  Settings,
  Signin,
  Signout,
  Signup,
} from "./pages";
import AuthProvider from "./context/auth-context";
import AdminProvider from "./context/admin-context";
import AppProvider from "./context/app-context";
import { page } from "./appTypes";

function App() {
  return (
    <AuthProvider>
      <Navigation />
      <Routes>
        <Route element={<Protected redirect={page.SIGNIN} />}>
          <Route
            path={page.HOME}
            element={
              <AppProvider>
                <Home />
              </AppProvider>
            }
          />
          <Route path={page.VIEW} element={<View />} />
          <Route
            path={page.PANEL}
            element={
              <AdminProvider>
                <Panel needsAuth />
              </AdminProvider>
            }
          />
          <Route path={page.SETTINGS} element={<Settings />} />
        </Route>
        <Route element={<Unprotected redirect={page.HOME} />}>
          <Route path="*" element={<Signin />} />
          <Route path={page.SIGNUP} element={<Signup />} />
        </Route>
        <Route path={page.SIGNOUT} element={<Signout />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
