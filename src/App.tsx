import './App.css'
import { Route,Routes } from 'react-router-dom'
import PeopleManagement from './peopleManagement'
import ShowBirthday from './showBirthday'
import Layout from './layout'


function App() {


 
  return (
    <>
      <Routes>
        <Route path='birthday-reminder/' element={<Layout/>}>
        <Route index element={<ShowBirthday/>}/>
        <Route path='persons' element={<PeopleManagement/>}/>   
        </Route>
      </Routes>
    </>
  )
}

export default App
