import React, { useEffect, useState } from "react";
import {
  FoodCategories,
  Product,
  SubFoodCategories,
  UpdateProductFields,
} from "../../../rami-types";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { updateProductDetailes } from "../../../features/products/productsAPI";
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
import { productsSelector } from "../../../features/products/productsSlice";
import RamiBtn from "../../../components/RamiBtn/RamiBtn";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UpdateProductProps {
  product: Product;
  onClose: () => void;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({ product, onClose }) => {
  const dispatch = useAppDispatch();
  const foodCategories = useAppSelector(foodCategoriesSelector);
  const subFoodCategories = useAppSelector(subFoodCategoriesSelector);
  const allProducts = useAppSelector(productsSelector);
  const [updatedProduct, setUpdatedProduct] = useState<UpdateProductFields>({
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
    if (!allProducts) {
      dispatch(getAllProductsApi());
    }
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
        toast.error("מחיר לא יכול להיות שלילי");
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
    const response = await dispatch(updateProductDetailes(updatedProduct));
    if (response.payload) {
      toast.success("המוצר עודכן בהצלחה");
      dispatch(getAllProductsApi());
    }
    onClose();
  };
  return (
    <div id="update-product">
      <h1 className="prod-info-title">עדכון פרטי מוצר</h1>

      <input
        type="text"
        name="product_name"
        placeholder="שם המוצר:"
        value={updatedProduct.product_name}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="product_price"
        placeholder="מחיר:"
        value={updatedProduct.product_price || ""}
        onChange={handleInputChange}
      />
      <textarea
        name="product_description"
        placeholder="תיאור המוצר:"
        value={updatedProduct.product_description}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="export_country"
        placeholder="מדינת ייצוא:"
        value={updatedProduct.export_country}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="brand"
        placeholder="מותג"
        value={updatedProduct.brand}
        onChange={handleInputChange}
      />

      <input
        type="text"
        name="content"
        placeholder="תוכן"
        value={updatedProduct.content}
        onChange={handleInputChange}
      />

      <input
        type="text"
        name="allergy_info"
        placeholder="מידע על אלרגנים"
        value={updatedProduct.allergy_info}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="type"
        placeholder="סוג המוצר:"
        value={updatedProduct.type}
        onChange={handleInputChange}
      />
      <select
        id="food_category_id"
        name="food_category_id"
        aria-placeholder=">קטגורית מזון ראשית:"
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
          <select
            id="sub_food_category_id"
            name="sub_food_category_id"
            aria-placeholder="קטגוריה משנית:"
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
      <input
        type="text"
        name="serving_suggestion"
        placeholder=" הצעת הגשה"
        value={updatedProduct.serving_suggestion}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="product_components"
        placeholder="רכיבי המוצר"
        value={updatedProduct.product_components}
        onChange={handleInputChange}
      />

      <input
        type="text"
        name="cosher"
        placeholder="כשרות"
        value={updatedProduct.cosher}
        onChange={handleInputChange}
      />

      <input
        type="text"
        name="israel_milk"
        placeholder="חלב ישראלי:"
        value={updatedProduct.israel_milk}
        onChange={handleInputChange}
      />
      <div>
        <RamiBtn
          className="saveBtn"
          type="button"
          onClick={handleUpdateProduct}
        >
          שמור
        </RamiBtn>{" "}
        <RamiBtn className="cancelBtn" type="button" onClick={onClose}>
          ביטול
        </RamiBtn>
      </div>
    </div>
  );
};

export default UpdateProduct;
