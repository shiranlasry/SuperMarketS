import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hook';
import { setIsOpenCartTrue, setIsToPayPressedFalse, setIsToPayPressedTrue } from '../../features/cart/cartSlice';
import { productsSelector } from '../../features/products/productsSlice';
import { useSelector } from 'react-redux';
import { getAllProductsApi } from '../../features/products/productsAPI';
import { Product } from '../../rami-types';
import ProductCard from '../ProductCard/ProductCard';

const CheckOutOffers = () => {
  const allProducts = useSelector(productsSelector);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!allProducts) {
      // Fetch products
      dispatch(getAllProductsApi());
    }
  }, []);

  useEffect(() => {
    getRandomProducts();
  }, [allProducts]);

  const getRandomProducts = () => {
    if (allProducts) {
      const random = [...allProducts].sort(() => Math.random() - 0.5).slice(0, 6);
      setRandomProducts(random);
    }
  };

  useEffect(() => {
    if (randomProducts.length > 0) {
      console.log(randomProducts);
    }
  }, [randomProducts]);

  useEffect(() => {
    dispatch(setIsOpenCartTrue());
    dispatch(setIsToPayPressedTrue());
    return () => {
      // Cleanup function to set isToPayPressed to false when leaving the CheckOutOffers component
      dispatch(setIsToPayPressedFalse());
    };
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="mt-5 mb-4">אולי יעניין אותך</h1>
      <div className="row">
        {randomProducts.map((product) => (
          <div key={product.product_id} className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
            <div className="product-card-wrapper">
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckOutOffers;
