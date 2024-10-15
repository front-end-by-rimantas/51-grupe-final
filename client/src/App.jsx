import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextWrapper } from "./context/GlobalContext";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { TermsOfService } from "./pages/TermsOfService";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

export function App() {
  return (
    <ContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Home />}></Route>
          <Route index path='/tos' element={<TermsOfService />}></Route>
          <Route index path='/login' element={<Login />}></Route>
          <Route index path='/register' element={<Register />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </ContextWrapper>
  )
}