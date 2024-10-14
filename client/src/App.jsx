import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextWrapper } from "./context/GlobalContext";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

export function App() {
  return (
    <ContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Home />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </ContextWrapper>
  )
}