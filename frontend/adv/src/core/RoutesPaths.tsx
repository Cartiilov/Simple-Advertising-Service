import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("../pages/Home"));
const Products = React.lazy(() => import("../pages/Products"));
const Search = React.lazy(() => import("../pages/Search"));
const SignIn = React.lazy(() => import("../pages/SignIn"));
const SignUp = React.lazy(() => import("../pages/SignUp"));
const PostPage = React.lazy(() => import("../pages/PostPage"));
const UserPage = React.lazy(() => import("../pages/UserPage"));
export default function AllRoutes() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
    </Suspense>
  );
}
