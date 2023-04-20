import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
// import App from './App'
import Root, { 
  loader as rootLoader,
  action as rootAction, 
} from "./routes/root"
import ErrorPage from "./error-page"
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact"
import EditContact, {
  action as editAction
} from './routes/edit'
import {action as destroyAction } from "./routes/destroy"
import Index from "./routes/index"
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    errorElement: <ErrorPage />,
    children: [ // creating pathless routes, participate in UI layout without requiring new path segements
    // wrap the child routes in a pathless route
          {
            errorElement: <ErrorPage />,
            children: [
              { index: true, element: <Index /> },
              {
                path:"contacts/:contactId",
                element: <Contact />,
                loader: contactLoader,
                action: contactAction, // calls the favorite action and all the data is revalidated automatically, no navigation, the url doesn't change, history stack is unaffected
                // when any errors are thrown in the child routes, our new pathless route will catch it and ternder, preserving root route's ui
                //basically renders error message in outlet rather than a new page
              },
              {
                path: "contacts/:contactId/edit",
                element: <EditContact />,
                loader: contactLoader,
                action: editAction,
              },
              {
                path: "contacts/:contactId/destroy",
                action: destroyAction,
                errorElement: <div>Oops! There was an error.</div>
              },
        ],
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
