import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import DashBoard from "./Components/Dashboard//DashBoard";
import NavHome from "./Components/Home/NavHome";

import InventoryHome from "./Components/Inventory/InventoryHome";
import InventoryForm from "./Components/Inventory/InventoryForm";
import SelectedItem from "./Components/Inventory/SelectedItem";
import EditInventoryItems from "./Components/Inventory/EditInventoryItems";
import CusHome from "./Components/Home/Home-Products";
import CusSelectedItem from "./Components/Home/Home-SelectedItem";
import Report1 from "./Components/Inventory/Inventory-report1";
import ProductCategory from "./Components/Inventory/inventory-AddNewCategory";
import ScannerBarcode from "./Components/Inventory/scanner";

import Layout from "./pages/SupplyManager/components/Layout";
import SupplyManagementHome from "./pages/SupplyManager/home.page";
import NotificationPage from "./pages/SupplyManager/components/low-stock-notifications/home.notifications";
import NotificationDetails from "./pages/SupplyManager/components/NotificationDetails";
import SupplierList from "./pages/SupplyManager/components/supplier-management/SupplierList";

import MapView from "./Components/DeliveryManagement/MapView/AlignMap";
import CreateVehicle from "./Components/DeliveryManagement/VehicleView/CreateVehicle";
import VehicleView from "./Components/DeliveryManagement/VehicleView/VehicleView";
import VehicleUpdateDelete from "./Components/DeliveryManagement/VehicleView/VehicleUpdateDelete";
import DeliveryView from "./Components/DeliveryManagement/DeliveryView/DeliveryView";
import CreateDelivery from "./Components/DeliveryManagement/MapView/DeliveryForm";
import DeliveryUpdateDelete from "./Components/DeliveryManagement/DeliveryView/DeliveryUpdateDelete";
import Orders from "./Components/DeliveryManagement/OrderView/Orders";

import SelectedOrderItem from "./Components/Order/Home-SelectedItem";
import CartPage from "./Components/Order/CartPages";
import DeliveryInfoPage from "./Components/Order/DeliveryInfoPage";
import PaymentPage from "./Components/Order/PaymentPage";
import AdminOrdersPage from "./Components/Order/AdminOrderdPage";

import { Provider } from "react-redux";
import store from "../src/Components/ReduxTool/Store";

// sanjuka
import RentalManagement from "./Components/RentalManagement/RentalManagement";
import LendedItemsList from "./Components/RentalManagement/lendedItem/LendedItemList";
import UserItemList from "./Components/RentalManagement/UserItemList/UserItemList";
import ReservedItemsList from "./Components/RentalManagement/ReservedItemsList/ReservedItemsList";
import RentalReport from "./Components/RentalManagement/RentalReport/RentalReport";
import PurchaseOrderList from "./pages/SupplyManager/components/purchase-order-management/PurchaseOrderList";


import DriverDispatcherHome from "./Components/DriverDispatcherManagement/DriverDispatcherHome";
import AddDriverForm from "./Components/DriverDispatcherManagement/AddDriverForm/AddDriverForm";
import UpdateDriverForm from "./Components/DriverDispatcherManagement/UpdateDriverForm/UpdateDriver";

// import SearchBar from "./Components/RentalManagement/searchBar/searchBar";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };
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

          <Route exact path="/cart" element={<CartPage cart={cart} />} />
          <Route
            exact
            path="/cusOrderSelectedItem/:id"
            element={<SelectedOrderItem addToCart={addToCart} />}
          />
          <Route exact path="/deliveryinfo" element={<DeliveryInfoPage />} />
          <Route exact path="/payment" element={<PaymentPage />} />
          <Route exact path="/order" element={<AdminOrdersPage />} />

          <Route
            exact
            path="/cusHome"
            element={<CusHome addToCart={addToCart} />}
          />
          <Route
            exact
            path="/cusSelectedItem/:id"
            element={<CusSelectedItem />}
          />
          <Route exact path="/report1" element={<Report1 />} />
          <Route exact path="/addNewCategory" element={<ProductCategory />} />
          <Route exact path="/scannerBarcode" element={<ScannerBarcode />} />

          {/* sanjuka - routes */}
          <Route path="/rentalService" element={<RentalManagement />} />
          <Route path="/lendedItems" element={<LendedItemsList />} />
          <Route path="/userItemList" element={<UserItemList />} />
          <Route path="/reserved-items" element={<ReservedItemsList />} />
          <Route path="/rentalReport" element={<RentalReport />} />

          {/* Prabashwara's routes */}
          <Route path="/MapView" element={<MapView />} />
          <Route path="/CreateVehicle" element={<CreateVehicle />} />
          <Route path="/VehicleView" element={<VehicleView />} />
          <Route
            path="/VehicleUpdateDelete/:id"
            element={<VehicleUpdateDelete />}
          />
          <Route path="/DeliveryView" element={<DeliveryView />} />
          <Route path="/CreateDelivery" element={<CreateDelivery />} />
          <Route
            path="/DeliveryUpdateDelete/:id"
            element={<DeliveryUpdateDelete />}
          />
          <Route path="/Orders" element={<Orders />} />

          <Route path="/driver-dispatcher" element={<DriverDispatcherHome />} />
          <Route path="/driver-dispatcher/AddDriver" element={<AddDriverForm />} />
          <Route path="/driver-dispatcher/:driverId" element={<UpdateDriverForm/>} />

          <Route
            path="/supply-management/*"
            element={
              <Layout>
                <Routes>
                  <Route index element={<SupplyManagementHome />} />
                  <Route path="notifications" element={<NotificationPage />} />
                  <Route
                    path="notifications/:id"
                    element={<NotificationDetails />}
                  />
                  <Route
                    path="supplier-management"
                    element={<SupplierList />}
                  />
                  <Route
                    path="purchase-orders"
                    element={<PurchaseOrderList />}
                  />
                  <Route path="return-management" element={<SupplierList />} />
                  <Route path="reports" element={<SupplierList />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
