/* eslint-disable react/prop-types */
import "./shoppingCart.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const ProToCart = ({ products, onClose, onRemove }) => {
  return (
    <div className="modal">
      <div className="shoppingCart">
        <div className="header">
          <h2>Shopping cart</h2>

          <button onClick={onClose} className="btn close-btn">
            <AiFillCloseCircle size={30} />
          </button>
        </div>
        <div className="cart-products">
          {products.length === 0 && (
            <span className="empty-text text-black">
              سلة التسوق الخاصة بك فارغة حالياً{" "}
            </span>
          )}
          {products.map((product) => (
            <div className="cart-product text-black" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className="product-info text-black">
                <h3>{product.name}</h3>
                <span className="product-price text-black">
                  {product.price} MAD
                </span>
              </div>
              <button
                className="btn remove-btn"
                onClick={() => onRemove(product.id)}
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          ))}
          {products.length > 0 && (
            <Link to="/checkout">
              <button className="btn checkout-btn hover:bg-red-700">
                Proceed to checkout
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProToCart;
