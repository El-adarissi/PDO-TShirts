import { createContext, useContext, useState,useEffect } from 'react';

const CartContext = createContext();

// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
        const [cartProducts, setCartProducts] = useState(() => {
            const savedCart = localStorage.getItem('cartProducts');
            return savedCart ? JSON.parse(savedCart) : [];
        });
    
        useEffect(() => {
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        }, [cartProducts]);

    return (
        <CartContext.Provider value={{cartProducts, setCartProducts}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
    return useContext(CartContext);
};
