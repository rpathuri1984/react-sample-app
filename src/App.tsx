import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./context/AuthContext";
import SecuredRoute from "./components/SecuredRoute";

function App() {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SecuredRoute />}>
              <Route index element={<HomePage />} />
              <Route path="teams">
                <Route index element={<div>teams</div>} />
                <Route path=":teamId" element={<div>teams with id</div>} />
                <Route path="new" element={<div>new team</div>} />
              </Route>
            </Route>
            <Route path="/user" element={<SecuredRoute />}>
              <Route index element={<div>user</div>} />
              <Route path="profile" element={<div>profile</div>} />
              <Route path="profile2" element={<div>profile2</div>} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
