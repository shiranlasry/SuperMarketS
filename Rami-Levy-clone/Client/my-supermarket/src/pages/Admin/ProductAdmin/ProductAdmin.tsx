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
      if (!AllProducts)
      dispatch(getAllProductsApi())
    }, []);
    useEffect(() => {
      if (AllProducts) {
        const updatedFilteredProducts: Product[] = AllProducts.filter((product: Product) =>
          product.product_name.includes(searchProducts)
        );
        setFilteredProducts(updatedFilteredProducts);
      }
    }, [AllProducts, searchProducts]);
    const showAllProducts = () => {
      setIsProductsShown(true);
    }
    const hideAllProducts = () => {
      setIsProductsShown(false);
    }
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      setsearchProducts(e.target.value);
  };
  const addNewProductPressed = () => {
    navigate('/add_new_product');
  }
  const addNewFoodCategoryPressed = () => {
    navigate('/add_new_food_category');
  }
  return (
    <>
      <div className="products-admin-container">
        <div className="btns-admin-header">
        <button onClick={addNewProductPressed}>הוסף מוצר חדש</button>
        <button onClick={addNewFoodCategoryPressed}>הוסף קטגוריה</button>
        {
          isProductsShown ? <button onClick={hideAllProducts}>הסתר מוצרים</button> :
          <button onClick={showAllProducts}>הצג מוצרים</button>
        }
      </div>
        {isProductsShown &&<>
        <label htmlFor="search">חיפוש מוצרים</label>
        <input
          type="text"
          id="search"
          name="search"
          value={searchProducts}
          onChange={handleSearchChange} />
        </>
                }
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
