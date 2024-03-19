import React, { useEffect, useState } from 'react';
import { ProductsList, Sales } from '../../../../rami-types';
import ProductCounter from '../../../ProductCounter/ProductCounter';
import { useAppDispatch, useAppSelector } from '../../../../app/hook';
import { selectSales } from '../../../../features/sales/salesSlice';
import { getSalesAPI } from '../../../../features/sales/salesAPI';
import './OrderProduct.scss'; // Import your CSS file for styling

interface OrderProductProps {
    product: ProductsList
}

const OrderProduct: React.FC<OrderProductProps> = ({ product }) => {
    const dispatch = useAppDispatch();
    
    const allSales = useAppSelector<Sales[]>(selectSales);

    useEffect(() => {
        if (allSales.length === 0) {
            dispatch(getSalesAPI());
        }
    }, []);

    const base64ImageA = product.product_img_data_a
        ? btoa(
            String.fromCharCode(...new Uint8Array(product.product_img_data_a.data))
        )
        : '';
    const [currentImage, setCurrentImage] = useState(base64ImageA);

    const checkDiscount = () => {
        if (allSales.length > 0 && product.product_price) {
            const sale = allSales.find((s) => s.product_id === product.product_id);
            if (sale) {
                return (
                    <div className="card-discount">
                        <p className="discount-text">מחיר מבצע: {sale.sale_price} <span className="card-shekel">₪</span> ליח'</p>
                        <p className="original-price">מחיר מקור: <span className="original-price-value">{product.product_price} <span className="card-shekel">₪</span></span></p>
                    </div>
                );
            }
        }
        return (
            <p className="original-price">מחיר: {product.product_price} <span className="card-shekel">₪</span> ליח'</p>
        );
    };

    return (
        <div className="row mb-2">
            <div className="product-card-new-order">
               
                <div className="product-details">
                    <img
                        src={`data:image/jpeg;base64,${currentImage}`}
                        className="card-img"
                        alt="Product Image"
                    />
                     <ProductCounter product={product} location={'cart'} />
                    <div className="card-content">
                        <h2 className="card-title">{product.product_name}</h2>
                        {checkDiscount()}
                        <p className="card-text">כמות: {product.product_amount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderProduct;
