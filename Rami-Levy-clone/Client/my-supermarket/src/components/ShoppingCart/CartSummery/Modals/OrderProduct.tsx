import React, { useEffect, useState } from 'react';
import { ProductsList, Sales } from '../../../../rami-types';
import { Modal } from 'react-bootstrap';
import ProductModal from '../../../ProductModal/ProductModal';
import ProductCounter from '../../../ProductCounter/ProductCounter';
import { useAppDispatch, useAppSelector } from '../../../../app/hook';
import { selectSales } from '../../../../features/sales/salesSlice';
import { getSalesAPI } from '../../../../features/sales/salesAPI';

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
                    <div className="card-price">
                        <p className="card-price-discount">
                            מחיר מבצע: {sale.sale_price}
                            <span className="card-shekel">₪</span>
                            <span className="per-unit"> ליח'</span>
                        </p>
                        <p className="card-original-price">
                            מחיר מקור: {product.product_price}
                            <span className="card-shekel">₪</span>
                            <span className="per-unit"> ליח'</span>
                        </p>
                    </div>
                );
            }
        }
        return (
            <p className="card-price">
                {product.product_price} <span className="card-shekel">₪</span>{' '}
                <span className="per-unit">ליח'</span>
            </p>
        );
    };

    return (
        <div className="row mb-2">
            <div className="card " >
                <ProductCounter product={product} location={'card'} />
                <img
                    src={`data:image/jpeg;base64,${currentImage}`}
                    className="card-img-top"
                    alt="Product Image"
                />
                <div className="card-body">
                    <h5 className="card-title">{product.product_name}</h5>
                    <p className="card-text">{product.product_description}</p>
                    {checkDiscount()}
                </div>
            </div>
         
        </div>
    );
};

export default OrderProduct;
