/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import DetailleProducts from '../pages/DetailleProducts';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const { cartProducts, setCartProducts } = useCart();

  if (!cartProducts) {
    console.error("Cart context is undefined.");
    return null;
  }

  return (
    <div className=''>
        <DetailleProducts />
    </div>
  );
};

export default ProductPage;
