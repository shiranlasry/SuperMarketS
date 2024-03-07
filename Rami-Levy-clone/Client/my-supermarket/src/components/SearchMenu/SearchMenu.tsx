import { useAppDispatch, useAppSelector } from '../../app/hook';
import { getAllProductsApi } from '../../features/products/productsAPI';
import { productsSelector } from '../../features/products/productsSlice';
import { Product } from '../../rami-types';
import ProductCard from '../ProductCard/ProductCard'; // Import your ProductCard component
import './searchMenu.scss';
import React, { useEffect, useState } from 'react';


const SearchMenu: React.FC<{ string: string }> = ({ string }) => {
    const allProducts = useAppSelector(productsSelector);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Initialize with an empty array
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!allProducts) {
            dispatch(getAllProductsApi());
        } else {
            // Filter products when allProducts is available
            const filtered = allProducts.filter((product) => 
                product.product_name.toLowerCase().includes(string.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [string]); // Add all dependencies to useEffect

    return (
        <div className="search-menu-container">
            <div className="search-menu">
                {filteredProducts.length === 0 ? (
                    <p className="no-results">לא נמצאו תוצאות חיפוש עבור "{string}"</p>
                ) : (
                    <>
                        <div className="name-list col-6">
                            {/* Render only the names of the filtered products */}
                            <ul>
                                {filteredProducts.map((product) => (
                                    <li key={product.product_id}>{product.product_name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="product-list col-6">
                            {/* Render the filtered products using your ProductCard component */}
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.product_id} product={product} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
    
};

export default SearchMenu;
