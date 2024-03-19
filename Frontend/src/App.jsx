import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import DashBoard from './Components/Dashboard//DashBoard';
import NavHome from './Components/Home/NavHome';

import InventoryHome from './Components/Inventory/InventoryHome';
import InventoryForm from './Components/Inventory/InventoryForm';
import SelectedItem from './Components/Inventory/SelectedItem';
import EditInventoryItems from './Components/Inventory/EditInventoryItems';
import CusHome from './components/Home-Products';
import CusSelectedItem from'./components/Home-SelectedItem';
import LowStock from './components/LowStockProducts';
import Report1 from './components/Inventory-report1';

import { Provider } from 'react-redux';
import store from '../src/Components/ReduxTool/Store';

import Layout from './pages/SupplyManager/components/Layout';
import SupplyManagementHome from './pages/SupplyManager/home.page';
import NotificationPage from './pages/SupplyManager/home.notifications';
import NotificationDetails from './pages/SupplyManager/components/NotificationDetails';
import SupplierList from './pages/SupplyManager/components/SupplierList';



function App() {

  return (


    <Provider store={store}>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<NavHome />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/DashBoard" element={<DashBoard />} />

          <Route exact path="/inventory" element={<InventoryHome />} />
          <Route exact path="/addnewItem" element={<InventoryForm />} />
          <Route exact path="/selectedItem/:id" element={<SelectedItem />} />
          <Route exact path="/editItem/:id" element={<EditInventoryItems />} />
          <Route exact path="/cusHome" element={<CusHome />} />
          <Route exact path="/cusSelectedItem/:id" element={<CusSelectedItem />} />
          <Route exact path="/lowStock" element={<LowStock />} />
          <Route exact path="/report1" element={<Report1 />} />

          <Route
            path="/supply-management/*"
            element={
              <Layout>
                <Routes>
                  <Route index element={<SupplyManagementHome />} />
                  <Route path="notifications" element={<NotificationPage />} />
                  <Route path="notifications/:id" element={<NotificationDetails />} />
                  <Route path="supplier-management" element={ <SupplierList /> } />
                  <Route path="purchase-orders" element={ <SupplierList /> } />
                  <Route path="return-management" element={ <SupplierList /> } />
                  <Route path="reports" element={ <SupplierList /> } />
                </Routes>
              </Layout>
            }
          />
        </Routes>

      </BrowserRouter>

    </Provider>




  );
}

export default App
