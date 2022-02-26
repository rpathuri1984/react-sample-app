import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route index element={<div>Ok</div>} />
              <Route path="teams" element={<div>teams</div>}>
                <Route path=":teamId" element={<div>teams with id</div>} />
                <Route path="new" element={<div>new team</div>} />
                <Route index element={<div>teams</div>} />
              </Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
