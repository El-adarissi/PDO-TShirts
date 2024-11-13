import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import Payment from './pages/payment.jsx';
import FAQPage from './pages/FAQPage.jsx';
import CartProvider from './context/CartContext.jsx';
import ProductDetails from './components/ProductPage.jsx';
import Checkout from './pages/Checkout.jsx';
import ProductForm from './components/UserAdmin/ProductForm.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
  },
  {
    path: "aboutpage",
    element:<AboutPage/>,
  },
  {
    path: "contact us",
    element:<ContactPage/>,
  },
  {
    path: "privacy",
    element:<PrivacyPage/>,
  },
  {
    path: "FAQPage",
    element:<FAQPage/>,
  },
  {
    path: "payment",
    element:<Payment/>,
  },
  {
    path: "/product/:id",
    element:<ProductDetails /> ,
  },
  {
    path: "/checkout",
    element:<Checkout /> ,
  },
  {
    path: "/AdminGestion",
    element:<ProductForm /> ,
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
