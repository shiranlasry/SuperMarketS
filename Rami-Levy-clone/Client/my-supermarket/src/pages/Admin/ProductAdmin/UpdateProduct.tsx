import React, { useEffect, useState } from "react";
import {
  FoodCategories,
  Product,
  SubFoodCategories,
  updateProductFields,
} from "../../../rami-types";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { updateProductDetailes } from "../../../features/api/productsAPI";
import {
  foodCategoriesSelector,
  subFoodCategoriesSelector,
} from "../../../features/categories/categoriesSlice";
import {
  getFoodCategoriesApi,
  get_SUB_FoodCategoriesApi,
} from "../../../features/categories/categoriesAPI";
import "./updateProduct.scss";
import { getAllProductsApi } from "../../../features/products/productsAPI";

interface UpdateProductProps {
  product: Product;
  onClose: () => void;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({ product, onClose }) => {
  const dispatch = useAppDispatch();
  const foodCategories = useAppSelector(foodCategoriesSelector);
  const subFoodCategories = useAppSelector(subFoodCategoriesSelector);
  const [updatedProduct, setUpdatedProduct] = useState<updateProductFields>({
    product_id: product.product_id ? product.product_id : undefined,
    product_name: product.product_name,
    product_price: product.product_price ? product.product_price : undefined,
    product_description: product.product_description,
    export_country: product.export_country,
    brand: product.brand,
    content: product.content,
    allergy_info: product.allergy_info,
    type: product.type,
    sub_food_category_id: product.sub_food_category_id
      ? product.sub_food_category_id
      : undefined,
    food_category_id: product.food_category_id
      ? product.food_category_id
      : undefined,
    cosher: product.cosher,
    israel_milk: product.israel_milk,
    serving_suggestion: product.serving_suggestion,
    product_components: product.product_components,
  });
  useEffect(() => {
    dispatch(getFoodCategoriesApi());
    dispatch(get_SUB_FoodCategoriesApi());
    console.log("Product:", product);
  }, []);
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "product_price") {
      const price = parseFloat(value);
      if (price < 0) {
        alert("מחיר לא יכול להיות שלילי");
        return;
      }
      setUpdatedProduct((prevState) => ({
        ...prevState,
        [name]: price,
      }));
    } else {
      setUpdatedProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Function to handle updating the product
  const handleUpdateProduct = async () => {
    console.log("Updated Product:", updatedProduct);
    const response = await dispatch(updateProductDetailes(updatedProduct));
    if (response.payload) {
      alert("Product updated successfully");
      dispatch(getAllProductsApi());
    }
    onClose();
  };
  return (
    <div id="update-product">
      <h1>עדכון פרטי מוצר</h1>
      <label>שם מוצר:</label>
      <input
        type="text"
        name="product_name"
        value={updatedProduct.product_name}
        onChange={handleInputChange}
      />
      <label>מחיר:</label>
      <input
        type="number"
        name="product_price"
        value={updatedProduct.product_price || ""}
        onChange={handleInputChange}
      />
      <label>תיאור המוצר:</label>
      <textarea
        name="product_description"
        value={updatedProduct.product_description}
        onChange={handleInputChange}
      />
      <label>מדינת ייצוא:</label>
      <input
        type="text"
        name="export_country"
        value={updatedProduct.export_country}
        onChange={handleInputChange}
      />
      <label>מותג:</label>
      <input
        type="text"
        name="brand"
        value={updatedProduct.brand}
        onChange={handleInputChange}
      />
      <label>תוכן:</label>
      <input
        type="text"
        name="content"
        value={updatedProduct.content}
        onChange={handleInputChange}
      />
      <label>מידע על אלרגנים:</label>
      <input
        type="text"
        name="allergy_info"
        value={updatedProduct.allergy_info}
        onChange={handleInputChange}
      />
      <label>סוג המוצר:</label>
      <input
        type="text"
        name="type"
        value={updatedProduct.type}
        onChange={handleInputChange}
      />
      <label htmlFor="food_category_id">קטגורית מזון ראשית:</label>
      <select
        id="food_category_id"
        name="food_category_id"
        value={updatedProduct.food_category_id || ""}
        onChange={handleInputChange}
        required
      >
        <option value="">בחר קטגוריה</option>
        {foodCategories &&
          foodCategories.map((category: FoodCategories) => (
            <option
              key={category.food_category_id}
              value={category.food_category_id}
            >
              {category.food_category_name}
            </option>
          ))}
      </select>
      {updatedProduct.food_category_id && subFoodCategories && (
        <>
          <label htmlFor="sub_food_category_id">קטגוריה משנית:</label>
          <select
            id="sub_food_category_id"
            name="sub_food_category_id"
            value={updatedProduct.sub_food_category_id || ""}
            onChange={handleInputChange}
            required
          >
            <option value="">בחר קטגוריה משנית</option>
            {subFoodCategories
              .filter(
                (subCategory: SubFoodCategories) =>
                  subCategory.food_category_id ===
                  (updatedProduct.food_category_id
                    ? +updatedProduct.food_category_id
                    : null)
              )
              .map((subCategory: SubFoodCategories) => (
                <option
                  key={subCategory.sub_food_category_id}
                  value={subCategory.sub_food_category_id}
                >
                  {subCategory.sub_food_category_name}
                </option>
              ))}
          </select>
        </>
      )}
      <label>הצעת הגשה</label>
      <input
        type="text"
        name="serving_suggestion"
        value={updatedProduct.serving_suggestion}
        onChange={handleInputChange}
      />
      <label>רכיבי המוצר:</label>
      <input
        type="text"
        name="product_components"
        value={updatedProduct.product_components}
        onChange={handleInputChange}
      />
      <label>כשרות:</label>
      <input
        type="text"
        name="cosher"
        value={updatedProduct.cosher}
        onChange={handleInputChange}
      />
      <label>חלב ישראלי:</label>
      <input
        type="text"
        name="israel_milk"
        value={updatedProduct.israel_milk}
        onChange={handleInputChange}
      />
      <div>
        <button className="saveBtn" type="button" onClick={handleUpdateProduct}>
          שמור
        </button>{" "}
        <button className="cancelBtn" type="button" onClick={onClose}>
          ביטול
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
