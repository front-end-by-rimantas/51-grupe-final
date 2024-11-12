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
// -----------
import { AdminAllAccounts } from "./pages/admin/AdminAllAccounts";
import { AdminAdminAccounts } from "./pages/admin/AdminAdminAccounts";
import { AdminUserAccounts } from "./pages/admin/AdminUserAccounts";
import { AdminBlockedAccounts } from "./pages/admin/AdminBlockedAccounts";
// -----------
import { AdminAllPosts } from "./pages/admin/AdminAllPosts";
import { AdminActivePosts } from "./pages/admin/AdminActivePosts";
import { AdminBlockedPosts } from "./pages/admin/AdminBlockedPosts";
import { AdminSettings } from "./pages/admin/AdminSettings";

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
              <Route path='/admin/accounts' element={<AdminAllAccounts />}></Route>
              <Route path='/admin/accounts/admin' element={<AdminAdminAccounts />}></Route>
              <Route path='/admin/accounts/users' element={<AdminUserAccounts />}></Route>
              <Route path='/admin/accounts/blocked' element={<AdminBlockedAccounts />}></Route>
              <Route path='/admin/posts' element={<AdminAllPosts />}></Route>
              <Route path='/admin/posts/active' element={<AdminActivePosts />}></Route>
              <Route path='/admin/posts/blocked' element={<AdminBlockedPosts />}></Route>
              <Route path='/admin/settings' element={<AdminSettings />}></Route>
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