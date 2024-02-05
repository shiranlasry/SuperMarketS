import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { foodCategoriesSelector, subFoodCategoriesSelector } from '../../features/categories/categoriesSlice'
import { getFoodCategoriesApi, get_SUB_FoodCategoriesApi } from '../../features/categories/categoriesAPI'
import { FoodCategories, Product, SubFoodCategories } from '../../rami-types'

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
  const [newProduct, setNewProduct] = useState(initialProduct);
  const [filteredSubFoodCategories, setFilteredSubFoodCategories] = useState<SubFoodCategories[] | null>(null);
  const foodCategories = useAppSelector(foodCategoriesSelector)
  const subFoodCategories = useAppSelector(subFoodCategoriesSelector)
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFoodCategoriesApi());
    dispatch(get_SUB_FoodCategoriesApi())
  }, [])

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
    };
  }
  const handelAddNewProduct = (e: React.FormEvent<HTMLFormElement>) => { }
  return (
    <div>
      <h1>הוספת מוצר חדש</h1>
      <form onSubmit={handelAddNewProduct}>
        <label htmlFor="category">קטגורית מזון ראשית:</label>
        <select
          id="food_category_id"
          name="food_category_id"
          value={newProduct.food_category_id || ''}
          onChange={handleInputChange}
        >
          <option value="">Select Category</option>
          {foodCategories &&
            foodCategories.map((category: FoodCategories) => (
              <option key={category.food_category_id} value={category.food_category_id}>
                {category.food_category_name}
              </option>
            ))}
        </select>

        {/* Render subcategory select only if a category is selected */}
        {filteredSubFoodCategories && (
          <>
            <label htmlFor="sub_food_category_id">Subcategory:</label>
            <select
              id="sub_food_category_id"
              name="sub_food_category_id"
              value={newProduct.sub_food_category_id || ''}
              onChange={handleInputChange}
            >
              <option value="">Select Subcategory</option>
              {filteredSubFoodCategories &&
                filteredSubFoodCategories.map((subCategory: SubFoodCategories) => (
                  <option key={subCategory.sub_food_category_id} value={subCategory.sub_food_category_id}>
                    {subCategory.sub_food_category_name}
                  </option>
                ))}
            </select>
          </>
        )}


      </form>
    </div>
  )
}

export default AddNewProduct
