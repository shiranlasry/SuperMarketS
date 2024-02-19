import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { getAllProductsApi } from '../../../features/products/productsAPI';
import { productsSelector } from '../../../features/products/productsSlice';
import { Product } from '../../../rami-types';
import ProductCard from './ProductCard';
import './ProductsAdmin.scss';


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
      <div className="products-admin-container">
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
                   <ProductCard product={product} key={product.product_id} />
                )
            })}
      <button onClick={() => navigate('/admin')} >חזור</button>

      </div>
    </>

  )
}

export default ProductsAdmin
