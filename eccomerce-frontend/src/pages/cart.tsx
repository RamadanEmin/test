import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { VscError } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import CartItemCard from '../components/cart-item';
import { RootState, server } from '../redux/store';
import { CartItem } from '../types/types';
import { addToCart, calculatePrice, discountApplied, removeCartItem } from '../redux/reducer/cartReducer';
import axios from 'axios';

const Cart = () => {
    const { cartItems, subtotal, tax, total, shippingCharges, discount } = useSelector((state: RootState) => state.cartReducer);
    const dispatch = useDispatch();

    const [couponCode, setCouponCode] = useState<string>('');
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

    const incrementHandler = (cartItem: CartItem) => {
        if (cartItem.quantity >= cartItem.stock) {
            return;
        }

        dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
    };

    const decrementHandler = (cartItem: CartItem) => {
        if (cartItem.quantity <= 1) {
            return;
        }

        dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
    };

    const removeHandler = (productId: string) => {
        dispatch(removeCartItem(productId));
    };

    useEffect(() => {
        const { token: cancelToken, cancel } = axios.CancelToken.source();

        const timeOutID = setTimeout(() => {
            axios
                .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
                    cancelToken
                })
                .then((res) => {
                    dispatch(discountApplied(res.data.discount));
                    setIsValidCouponCode(true);
                    dispatch(calculatePrice());
                })
                .catch(() => {
                    dispatch(discountApplied(0));
                    setIsValidCouponCode(false);
                    dispatch(calculatePrice());
                });
        }, 1000);

        return () => {
            clearTimeout(timeOutID);
            cancel();
            setIsValidCouponCode(false);
        };
    }, [couponCode]);

    useEffect(() => {
        dispatch(calculatePrice());
    }, [cartItems]);

    return (
        <div className="cart">
            <main>
                {cartItems.length > 0
                    ? (cartItems.map((i, idx) =>
                        <CartItemCard
                            incrementHandler={incrementHandler}
                            decrementHandler={decrementHandler}
                            removeHandler={removeHandler}
                            key={idx}
                            cartItem={i}
                        />)
                    ) : (
                        <h1>No Items Added</h1>
                    )
                }
            </main>
            <aside>
                <p>Subtotal: {subtotal} лв.</p>
                <p>Shipping Charges: {shippingCharges} лв.</p>
                <p>Tax: {tax}лв.</p>
                <p>
                    Discount: <em className="red"> - {discount} лв.</em>
                </p>
                <p>
                    <b>Total: {total} лв.</b>
                </p>

                <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                />

                {couponCode &&
                    (isValidCouponCode ? (
                        <span className="green">
                            {discount}лв. off using the <code>{couponCode}</code>
                        </span>
                    ) : (
                        <span className="red">
                            Invalid Coupon <VscError />
                        </span>
                    ))}

                {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
            </aside>
        </div>
    );
}

export default Cart;