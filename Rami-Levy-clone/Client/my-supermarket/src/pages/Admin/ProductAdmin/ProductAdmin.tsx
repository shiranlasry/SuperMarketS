import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { productsSelector } from '../../../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { getAllProductsApi } from '../../../features/products/productsAPI';
import { Product } from '../../../rami-types';


const ProductsAdmin = () => {
  const AllProducts = useAppSelector(productsSelector);
  const [isProductsShown, setIsProductsShown] = useState(false);
  const [searchProducts, setsearchProducts] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProductsApi())
  }, []);
  useEffect(() => {
    const updatedFilteredProducts = AllProducts?.filter(product => product.product_name.includes(searchProducts));
    if (updatedFilteredProducts)
      setFilteredProducts(updatedFilteredProducts);
  }, [AllProducts, searchProducts]);
  const showAllProducts = () => {
    setIsProductsShown(true);
  }
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setsearchProducts(e.target.value);
};
  const addNewProductPressed = () => {
    navigate('/add_new_product');
  }
  return (
    <>
      <div>
        <button onClick={addNewProductPressed}>הוסף מוצר חדש</button>
        <button onClick={showAllProducts}>חפש מוצר</button>

        {isProductsShown &&
                <input
                    type="text"
                    placeholder="Search by product name"
                    value={searchProducts}
                    onChange={handleSearchChange}
                />}
        {isProductsShown && filteredProducts.map((product) => {
                return (
                    <div key={product.product_id}>
                        <h3>{product.product_id}</h3>
                        <h3>{product.product_name}</h3>
                        <h3>{product.product_price}</h3>
                        <button>Update</button>
                        <button>Delete</button>
                        <button>Inventory Manage</button>
                        <button>Update Images</button>
                    </div>
                )
            })}

      </div>
      <button onClick={() => navigate(-1)} >חזור</button>
    </>

  )
}

export default ProductsAdmin
