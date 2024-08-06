import { Link } from 'react-router-dom';
import ProductCard from '../components/product-card';
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/image3.png';
import image4 from '../assets/images/image4.png';
import { ImageSlider } from '../components/imageSlider';
import { useLatestProductsQuery } from '../redux/api/productAPI';
import { toast } from 'react-hot-toast';
import { Skeleton } from '../components/loader';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducer/cartReducer';
import { CartItem } from '../types/types';

const IMAGES = [
    { url: image1, alt: 'Image One' },
    { url: image2, alt: 'Image Two' },
    { url: image3, alt: 'Image Three' },
    { url: image4, alt: 'Image Four' }
];

const Home = () => {
    const { data, isError, isLoading } = useLatestProductsQuery('');

    const dispatch = useDispatch();

    const addToCartHandler = (cartItem: CartItem) => {
        if (cartItem.stock < 1) {
            return toast.error('Out of Stock');
        }

        dispatch(addToCart(cartItem));
        toast.success('Added to cart');
    };

    if (isError) {
        toast.error('Cannot Fetch the Products');
    }

    return (
        <div className="home">

            <div style={{
                maxWidth: '1200px',
                width: '100%',
                height: '500px',
                aspectRatio: '1 / 2',
                margin: '0 auto'
            }}>
                <ImageSlider images={IMAGES} />
            </div>

            <h1>Latest Products
                <Link to="/search" className="findmore">
                    More
                </Link>
            </h1>

            <main>
                {isLoading ? (
                    <>
                        {Array.from({ length: 6 }, (_, i) => (
                            <div key={i} style={{ height: "25rem" }}>
                                <Skeleton width="18.75rem" length={1} height="20rem" />
                                <Skeleton width="18.75rem" length={2} height="1.95rem" />
                            </div>
                        ))}
                    </>
                ) : (
                    data?.products.map((i) => (
                        <ProductCard
                            key={i._id}
                            productId={i._id}
                            name={i.name}
                            price={i.price}
                            stock={i.stock}
                            handler={addToCartHandler}
                            photos={i.photos}
                        />
                    ))
                )}
            </main>
        </div>
    );
}

export default Home;