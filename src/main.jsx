import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homepage from './routes/Homepage.jsx';
import PostListPage from './routes/PostListPage.jsx';
import LoginPage from './routes/LoginPage.jsx';
import RegisterPage from './routes/RegisterPage.jsx';
import SinglePostPage from './routes/SinglePostPage.jsx';
import Write from './routes/Write.jsx';
import MainLayout from './layouts/MainLayout.jsx';


const router = createBrowserRouter([
  {
  element:<MainLayout />,
  children:[
    {
      path: "/",
      element: <Homepage />
    },
    {
      path: "/posts",
      element: <PostListPage />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/register",
      element: <RegisterPage />
    },
    {
      path: "/:slug",
      element: <SinglePostPage />
    },
    {
      path: "/write",
      element: <Write />
    },
  ]
  }
]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
