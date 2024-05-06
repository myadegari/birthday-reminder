import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import PeopleManagement from './peopleManagement'
import ShowBirthday from './showBirthday'
import Layout from './layout'


function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element:<Layout/>,
      errorElement:<h1>404 Not Found</h1>,
      children: [
        {
          path: '/persons',
          element: <PeopleManagement />
        },
        {
          index: true,
          element: <ShowBirthday />
        }
      ]
    }
  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
