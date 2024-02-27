import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { getAllProductsApi } from '../../../features/products/productsAPI';
import { productsSelector } from '../../../features/products/productsSlice';
import { Product } from '../../../rami-types';
import ProductCard from './ProductCard';
import './ProductsAdmin.scss';
import { Modal } from 'react-bootstrap';
import AddNewSubFoodCategory from './AddNewSubFoodCategory/AddNewSubFoodCategory';
import AddNewProduct from './AddNewProduct/AddNewProduct';
import AddNewFoodCategory from './AddNewFoodCategory/AddNewFoodCategory';



const ProductsAdmin = () => {
  const AllProducts = useAppSelector(productsSelector);
  const [isProductsShown, setIsProductsShown] = useState(false);
  const [searchProducts, setsearchProducts] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [addSubFoodCategoriesPressed, setAddSubFoodCategoriesPressed] = useState(false);
  const [addNewProductPressed, setAddNewProductPressed] = useState(false);
  const [addNewFoodCategoryPressed, setAddNewFoodCategoryPressed] = useState(false);

  const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
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
    const addNewSubFoodCategoryPressed = () => {
      setAddSubFoodCategoriesPressed(true);
    }
    const hideAllProducts = () => {
      setIsProductsShown(false);
    }
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      setsearchProducts(e.target.value);
  };
  const NewProductPressed = () => {
  setAddNewProductPressed(true);
  }
  const NewFoodCategoryPressed = () => {
  setAddNewFoodCategoryPressed(true);
  }
  console.log(filteredProducts.map((product) => product.product_id));
  return (
    <>
      <div className="products-admin-container">
        <div className="btns-admin-header">
        <button onClick={NewProductPressed}>הוסף מוצר חדש</button>
        <button onClick={NewFoodCategoryPressed}>הוסף קטגוריה</button>
        <button onClick={addNewSubFoodCategoryPressed}>הוסף תת קטגוריה</button>

        {
          isProductsShown ? <button onClick={hideAllProducts}>הסתר מוצרים</button> :
          <button onClick={showAllProducts}>הצג מוצרים</button>
        }
        {
          addSubFoodCategoriesPressed &&
          <Modal
          id={"modal-add-sub-food-category"}
          show={addSubFoodCategoriesPressed}
          onHide={() => setAddSubFoodCategoriesPressed(false)}
          dialogClassName="custom-modal"
        >
          <Modal.Body>
            <AddNewSubFoodCategory
              onClose={() => setAddSubFoodCategoriesPressed(false)}
            />
          </Modal.Body>
        </Modal>
        }
        {
          addNewProductPressed &&
          <Modal
          id={"modal-add-new-product"}
          show={addNewProductPressed}
          onHide={() => setAddNewProductPressed(false)}
          dialogClassName="custom-modal"
        >
          <Modal.Body>
            <AddNewProduct
              onClose={() => setAddNewProductPressed(false)}
            />
          </Modal.Body>
        </Modal>
        }
        {
          addNewFoodCategoryPressed &&
          <Modal
          id={"modal-add-new-food-category"}
          show={addNewFoodCategoryPressed}
          onHide={() => setAddNewFoodCategoryPressed(false)}
          dialogClassName="custom-modal"
        >
          <Modal.Body>
            <AddNewFoodCategory
              onClose={() => setAddNewFoodCategoryPressed(false)}
            />
          </Modal.Body>
        </Modal>
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
