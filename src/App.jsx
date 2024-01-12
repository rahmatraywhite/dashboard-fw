
import Homepage from './pages/Homepage'
import Dashboard from './pages/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ViewMatakuliah from './pages/ViewMatakuliah'
import AddMatakuliah from './pages/AddMatakuliah'
import AddMahasiswa from './pages/AddMahasiswa'
import ViewMahasiswa from './pages/ViewMahasiswa'
import AddDosen from './pages/AddDosen'
import ViewDosen from './pages/ViewDosen'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <h1>home</h1>,
      },
      {
        path: '/matakuliah/add',
        element: <AddMatakuliah />,
      },
      {
        path: '/matakuliah/view',
        element: <ViewMatakuliah />,
      },
      {
        path: '/mahasiswa/add',
        element: <AddMahasiswa />
      },
      {
        path: '/mahasiswa/view',
        element: <ViewMahasiswa />
      },
      {
        path: '/dosen/add',
        element: <AddDosen />
      },
      {
        path: '/dosen/view',
        element: <ViewDosen />
      }
    ]
  }
])
function App() {
  return <RouterProvider router={router} />
}

export default App
