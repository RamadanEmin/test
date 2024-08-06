import { Link } from 'react-router-dom';
import { FaExpandAlt, FaPlus } from 'react-icons/fa';
import { transformImage } from '../utils/features';
import { CartItem } from '../types/types';

type ProductsProps = {
    productId: string;
    photos: {
        url: string;
        public_id: string;
    }[];
    name: string;
    price: number;
    stock: number;
    handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({ productId, price, name, photos, stock, handler }: ProductsProps) => {
    return (
        <div className="product-card">
            <img src={transformImage(photos?.[0]?.url, 400)} alt={name} />
            <p>{name}</p>
            <span>{price}лв.</span>

            <div>
                <button
                    onClick={() =>
                        handler({ productId, price, name, photo: photos[0].url, stock, quantity: 1 })
                    }
                >
                    <FaPlus />
                </button>

                <Link to={`/product/${productId}`}>
                    <FaExpandAlt />
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;