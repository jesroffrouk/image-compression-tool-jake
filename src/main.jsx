import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Homepage from './pages/Homepage.jsx'
import { createBrowserRouter, createRoutesFromElements, Route , RouterProvider} from 'react-router'

const router = createBrowserRouter(
  createRoutesFromElements(
   <Route path='' element={<Homepage/>} />
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
