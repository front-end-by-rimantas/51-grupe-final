import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextWrapper } from "./context/UserContext";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { TermsOfService } from "./pages/TermsOfService";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Feed } from "./pages/Feed";
import { PublicLayout } from "./layout/PublicLayout";
import { UserLayout } from "./layout/UserLayout";
import { UserProfile } from "./pages/user-profile/UserProfile";
import { PostsContextWrapper } from "./context/PostsContext";

export function App() {
  return (
    <UserContextWrapper>
      <PostsContextWrapper>
        <BrowserRouter>
          <Routes>
            <Route Component={PublicLayout}>
              <Route index path='/' element={<Home />}></Route>
              <Route path='/tos' element={<TermsOfService />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
            </Route>

            <Route Component={UserLayout}>
              <Route path='/feed' element={<Feed />}></Route>
              <Route path='/profile' element={<UserProfile />}></Route>
              {/* <Route path='/change-password' element={<UserProfile />}></Route> */}
              {/* <Route path='/history' element={<UserProfile />}></Route> */}
              {/* <Route path='/payments' element={<UserProfile />}></Route> */}
            </Route>

            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </PostsContextWrapper>
    </UserContextWrapper>
  )
}