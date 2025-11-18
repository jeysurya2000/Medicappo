import DoctorLogin from './components/doctor/DoctorLogin'
import '../src/App.css'
import {Routes, Route} from 'react-router-dom'
import DoctorRegister from './components/doctor/DoctorRegister'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<DoctorLogin />}/>
      <Route path='/doctorRegister' element={<DoctorRegister/>}/>
    </Routes>
     
    </>
  )
}

export default App
