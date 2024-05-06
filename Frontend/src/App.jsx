import { AuthProvider } from './pages/common/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/common/Login'
import Signup from './pages/common/Signup'
import NotFound from './pages/common/NotFound'
import Dashboard from './pages/common/Dashboard';

import UserProfile from './pages/common/UserProfile';
import CashierHome from './pages/cashier/CashierHome';
import NewSale from './pages/cashier/CashierHome';
import Sales from './pages/salesManager/Sales';




export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000} />
      <AuthProvider>

        <Routes>

          {/*Common Routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<NotFound />} />


          {/* Inside dashboard layout */}
          <Route path='/' element={<Dashboard />}>

            {/*Cashier Routes */}
            <Route path='profile' element={<UserProfile />} />
            <Route path='/cashier' element={<CashierHome />} />


            {/*Sales Manager Routes */}
            <Route path='/sales' element={<Sales />} />

          </Route>
        </Routes>
        {/* <StickyFooter /> */}
      </AuthProvider>
    </BrowserRouter>
  )
}