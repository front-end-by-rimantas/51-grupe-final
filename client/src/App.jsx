import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextWrapper } from "./context/UserContext";
import { PostsContextWrapper } from "./context/PostsContext";

// PUBLIC PAGES
import { PublicLayout } from "./layout/PublicLayout";
import { Home } from "./pages/public/Home";
import { NotFound } from "./pages/public/NotFound";
import { TermsOfService } from "./pages/public/TermsOfService";
import { Register } from "./pages/public/Register";
import { Login } from "./pages/public/Login";

// USER PAGES
import { UserLayout } from "./layout/UserLayout";
import { Feed } from "./pages/user/Feed";
import { UserProfile } from "./pages/user/user-profile/UserProfile";

// ADMIN PAGES
import { AdminLayout } from "./layout/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";

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

            <Route Component={AdminLayout}>
              <Route path='/admin' element={<AdminDashboard />}></Route>
            </Route>

            <Route Component={PublicLayout}>
              <Route path='*' element={<NotFound />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </PostsContextWrapper>
    </UserContextWrapper >
  )
}