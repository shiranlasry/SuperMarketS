import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { foodCategoriesSelector, subFoodCategoriesSelector } from '../../features/categories/categoriesSlice';
import { getFoodCategoriesApi, get_SUB_FoodCategoriesApi } from '../../features/categories/categoriesAPI';
import { FoodCategories, Product, SubFoodCategories } from '../../rami-types';
import { addNewProductDetailes } from '../../features/api/productsAPI';

const AddNewProduct = () => {
  const initialProduct: Product = {
    product_id: null,
    sub_food_category_id: null,
    sub_food_category_name: '',
    food_category_id: null,
    food_category_name: '',
    product_price: null,
    product_name: '',
    product_description: '',
    export_country: '',
    brand: '',
    content: '',
    allergy_info: '',
    type: '',
    israel_milk: '',
    cosher: '',
  };
  
  const [imagesProductFiles, setImagesProductFiles] = useState<File[]>();
  const [add, setAdd] = useState<number>(0);
  const [newProduct, setNewProduct] = useState(initialProduct);
  const [filteredSubFoodCategories, setFilteredSubFoodCategories] = useState<SubFoodCategories[] | null>(null);
  const foodCategories = useAppSelector(foodCategoriesSelector);
  const subFoodCategories = useAppSelector(subFoodCategoriesSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFoodCategoriesApi());
    dispatch(get_SUB_FoodCategoriesApi());
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });

    if (name === 'food_category_id' && value !== '' && subFoodCategories) {
      setFilteredSubFoodCategories(
        subFoodCategories.filter(
          (subCategory: SubFoodCategories) => subCategory.food_category_id === +value
        )
      );
    }
    else {
      setFilteredSubFoodCategories(null);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const files = e.target.files;
    setImagesProductFiles(files ? Array.from(files) : []  );
  }
  const handelAddNewProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const insertProductId= await addNewProductDetailes(newProduct);
   
  };

  return (
    <div>
      <h1>הוספת מוצר חדש</h1>
      <form onSubmit={handelAddNewProduct}>
        {/* Food Category */}
        <label htmlFor="food_category_id">קטגורית מזון ראשית:</label>
        <select
          id="food_category_id"
          name="food_category_id"
          value={newProduct.food_category_id || ''}
          onChange={handleInputChange}
        >
          <option value="">בחר קטגוריה</option>
          {foodCategories &&
            foodCategories.map((category: FoodCategories) => (
              <option key={category.food_category_id} value={category.food_category_id}>
                {category.food_category_name}
              </option>
            ))}
        </select>

        {/* Subcategory */}
        {filteredSubFoodCategories && (
          <>
            <label htmlFor="sub_food_category_id">קטגוריה משנית:</label>
            <select
              id="sub_food_category_id"
              name="sub_food_category_id"
              value={newProduct.sub_food_category_id || ''}
              onChange={handleInputChange}
            >
              <option value="">בחר קטגוריה משנית</option>
              {filteredSubFoodCategories.map((subCategory: SubFoodCategories) => (
                <option key={subCategory.sub_food_category_id} value={subCategory.sub_food_category_id}>
                  {subCategory.sub_food_category_name}
                </option>
              ))}
            </select>
          </>
        )}
          
         


        {/* Product Name */}
        <label htmlFor="product_name">שם המוצר:</label>
        <input
          type="text"
          id="product_name"
          name="product_name"
          value={newProduct.product_name}
          onChange={handleInputChange}
        />

        {/* Product Description */}
        <label htmlFor="product_description">תיאור המוצר:</label>
        <textarea
          id="product_description"
          name="product_description"
          value={newProduct.product_description}
          onChange={handleInputChange}
        ></textarea>

        {/* Product Price */}
        <label htmlFor="product_price">מחיר המוצר:</label>
        <input
          type="number"
          id="product_price"
          name="product_price"
          value={newProduct.product_price || ''}
          onChange={handleInputChange}
        />

        {/* Export Country */}
        <label htmlFor="export_country">מדינת ייצוא:</label>
        <input
          type="text"
          id="export_country"
          name="export_country"
          value={newProduct.export_country}
          onChange={handleInputChange}
        />

        {/* Brand */}
        <label htmlFor="brand">מותג:</label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={newProduct.brand}
          onChange={handleInputChange}
        />

        {/* Content */}
        <label htmlFor="content">תכולה:</label>
        <input
          type="text"
          id="content"
          name="content"
          value={newProduct.content}
          onChange={handleInputChange}
        />

        {/* Allergy Information */}
        <label htmlFor="allergy_info">מידע על אלרגנים:</label>
        <input
          type="text"
          id="allergy_info"
          name="allergy_info"
          value={newProduct.allergy_info}
          onChange={handleInputChange}
        />

        {/* Type */}
        <label htmlFor="type">סוג המוצר:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={newProduct.type}
          onChange={handleInputChange}
        />

        {/* Israel Milk */}
        <label htmlFor="israel_milk">חלב ישראלי:</label>
        <input
          type="text"
          id="israel_milk"
          name="israel_milk"
          value={newProduct.israel_milk}
          onChange={handleInputChange}
        />

        {/* Kosher */}
        <label htmlFor="cosher">כשרות:</label>
        <input
          type="text"
          id="cosher"
          name="cosher"
          value={newProduct.cosher}
          onChange={handleInputChange}
        />
        <div>
          <label htmlFor="imagesProduct">תמונות המוצר:</label>
          <input
            type="file"
            id="imagesProduct"
            name="imagesProduct"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <div>
        <label htmlFor="imagesProduct">כמה במלאי ?</label>
        <input
          type="number"
          id="add"
          name="add"
          value={add}
          onChange={(e) => setAdd(+e.target.value)}
        />

        </div>
        <button type="submit">שלח</button>
      </form>
    </div>
  );
};

export default AddNewProduct;
