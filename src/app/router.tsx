import { createBrowserRouter } from "react-router-dom"
import LaunchListPage from "../features/launches/pages/LaunchListPage"
import LaunchDetailPage from "../features/launches/pages/LaunchDetailPage"

export const router = createBrowserRouter([
  { path: "/", element: <LaunchListPage /> },
  { path: "/launch/:id", element: <LaunchDetailPage /> },
])
