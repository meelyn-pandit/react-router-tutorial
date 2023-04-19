import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
// import App from './App'
import Root, { loader as rootLoader } from "./routes/root"
import ErrorPage from "./error-page"
import Contact from "./routes/contact"
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader, // load data with rootLoader
    children: [
      {
        path:"contacts/:contactId",
        element: <Contact />,
      }
    ]
  },
  // {
  //   path: "contacts/:contactId",
  //   element: <Contact />
  // }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
