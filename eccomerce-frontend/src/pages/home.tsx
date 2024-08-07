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
import videoCover from '../assets/videos/cover.mp4';
import { FaAnglesDown, FaHeadset } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { TbTruckDelivery } from 'react-icons/tb';
import { LuShieldCheck } from 'react-icons/lu';

const partners = [
    {
        src: 'https://www.vectorlogo.zone/logos/apple/apple-ar21.svg',
        alt: 'Apple'
    },
    {
        src: 'https://www.vectorlogo.zone/logos/samsung/samsung-ar21.svg',
        alt: 'Samsung'
    },
    {
        src: 'https://www.vectorlogo.zone/logos/lg/lg-ar21.svg',
        alt: 'LG'
    },
    {
        src: 'https://www.vectorlogo.zone/logos/huawei/huawei-ar21.svg',
        alt: 'Huawei'
    },
    {
        src: 'https://www.vectorlogo.zone/logos/dell/dell-ar21.svg',
        alt: 'Dell'
    },
    {
        src: 'https://www.vectorlogo.zone/logos/hp/hp-ar21.svg',
        alt: 'HP'
    },
    {
        src: 'https://www.vectorlogo.zone/logos/acer/acer-ar21.svg',
        alt: 'Acer'
    },
    {
        src: 'https://www.vectorlogo.zone/logos/asus/asus-ar21.svg',
        alt: 'Asus'
    },
    {
        src: 'https://www.vectorlogo.zone/logos/intel/intel-ar21.svg',
        alt: 'Intel'
    },
    {
        src: 'https://www.vectorlogo.zone/logos/amd/amd-ar21.svg',
        alt: 'AMD'
    },
    {
        src: 'https://www.vectorlogo.zone/logos/nvidia/nvidia-ar21.svg',
        alt: 'Nvidia'
    },
    {
        src: 'https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg',
        alt: 'Microsoft'
    },
    {
        src: 'https://www.vectorlogo.zone/logos/bose/bose-ar21.svg',
        alt: 'Bose'
    },
];

const categories = [
    'Smartphones - Accessories',
    'Laptops - Computers',
    'Tablets - E-Readers',
    'Cameras - Photography',
    'Audio - Headphones',
    'Wearable Technology',
    'Home Appliances',
    'Gaming',
    'Television - Home Entertainment',
    'Networking - Smart Home',
];

const services = [
    {
        icon: <TbTruckDelivery />,
        title: "FREE AND FAST DELIVERY",
        description: "Free delivery for all orders over $200",
    },
    {
        icon: <LuShieldCheck />,
        title: "SECURE PAYMENT",
        description: "100% secure payment",
    },
    {
        icon: <FaHeadset />,
        title: "24/7 SUPPORT",
        description: "Get support 24/7",
    },
];

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

    const coverMessage =
        'Welcome to DDS-ecommerce, your ultimate destination for the latest and greatest in electronics. From cutting-edge gadgets to essential home appliances, we offer a wide range of products that cater to tech enthusiasts and everyday users alike. Shop with us for unbeatable prices, top-notch customer service, and a seamless shopping experience. Elevate your tech game with DDS-ecommerce today!'.split(
            ' '
        );

    return (
        <>
            <div className="home">
                <section></section>
                <div>
                    <aside>
                        <h1>Categories</h1>
                        <ul>
                            {categories.map((i) => (
                                <li key={i}>
                                    <Link to={`/search?category=${i.toLowerCase()}`}>{i}</Link>
                                </li>
                            ))}
                        </ul>
                    </aside>
                    <div style={{
                        maxWidth: '1200px',
                        width: '100%',
                        height: '500px',
                        aspectRatio: '1 / 2',
                        margin: '0 auto'
                    }}>
                        <ImageSlider images={IMAGES} />
                    </div>
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

            <article className="cover-video-container">
                <div className="cover-video-overlay"></div>
                <video autoPlay loop muted src={videoCover} />
                <div className="cover-video-content">
                    <motion.h2
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Ecommerce
                    </motion.h2>
                    {coverMessage.map((el, i) => (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.25,
                                delay: i / 10,
                            }}
                            key={i}
                        >
                            {el}{" "}
                        </motion.span>
                    ))}
                </div>
                <motion.span
                    animate={{
                        y: [0, 10, 0],
                        transition: {
                            duration: 1,
                            repeat: Infinity,
                        },
                    }}
                >
                    <FaAnglesDown />
                </motion.span>
            </article>

            <article className="our-clients">
                <div>
                    <h2>Our partners</h2>
                    <div>
                        {partners.map((client, i) => (
                            <motion.img
                                initial={{
                                    opacity: 0,
                                    x: -10,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        delay: i / 20,
                                        ease: "circIn",
                                    },
                                }}
                                src={client.src}
                                alt={client.alt}
                                key={i}
                            />
                        ))}
                    </div>
                </div>
            </article>

            <hr
                style={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    border: "none",
                    height: "1px",
                }}
            />

            <article className="our-services">
                <ul>
                    {services.map((service, i) => (
                        <motion.li
                            initial={{ opacity: 0, y: -100 }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    delay: i / 20,
                                },
                            }}
                            key={service.title}
                        >
                            <div>{service.icon}</div>
                            <section>
                                <h3>{service.title}Y</h3>
                                <p>{service.title}</p>
                            </section>
                        </motion.li>
                    ))}
                </ul>
            </article>
        </>
    );
}

export default Home;