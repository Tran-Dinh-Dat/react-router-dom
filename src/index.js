import React from 'react';
import ReactDOM from 'react-dom/client';
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import ErrorPage from './error-page';
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from './routes/contact';
import EditContact, {
  action as editAction,
} from './routes/edit';
import { action as destroyAction } from './routes/destroy';
import Index from './routes';
import { ThemeProvider } from './theme-context';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
          },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          }
        ],
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
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
