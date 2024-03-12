import React, { useEffect } from "react";
import "./AddNewSubFoodCategory.scss";
import { foodCategoriesSelector } from "../../../../features/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { navBarItemsSelector } from "../../../../features/navbar_items/navbarItemsSlice";
import { getFoodCategoriesApi } from "../../../../features/categories/categoriesAPI";
import { getAllNavBarItemsApi } from "../../../../features/navbar_items/navbarItemsAPI";
import { addNewSubFoodCategoryApi } from "../../../../features/api/categoriesAPI";
import RamiBtn from "./../../../../components/RamiBtn/RamiBtn";

interface AddNewSubFoodCategoryProps {
  onClose: () => void;
}

const AddNewSubFoodCategory: React.FC<AddNewSubFoodCategoryProps> = ({
  onClose,
}) => {
  const foodCategories = useAppSelector(foodCategoriesSelector);
  const navBarItems = useAppSelector(navBarItemsSelector);
  const dispatch = useAppDispatch();
  const getFoodCategories = async () => {
    await dispatch(getFoodCategoriesApi());
  };

  useEffect(() => {
    if (!foodCategories) {
      getFoodCategories();
    }
    if (!navBarItems) {
      dispatch(getAllNavBarItemsApi());
    }
  }, []);


  const handelAddNewSubFoodCategory = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      e.preventDefault();
      const sub_category_name = (e.target as HTMLFormElement).sub_category_name
        .value;
      const food_category_id = (e.target as HTMLFormElement).food_category_id
        .value;
      const navbar_item_id = (e.target as HTMLFormElement).navbar_item_id.value;
      await addNewSubFoodCategoryApi(
        sub_category_name,
        food_category_id,
        navbar_item_id
      );
      //onClose();
    } catch (error) {
      console.error("Error addNewProductInventories:", error);
    }
  };

  return (
    <div className="add-new-sub-food-category-container">
      <h1 className="new-sub-cat-title">הוסף תת קטגוריה חדשה</h1>
      <form
        className="add-new-sub-food-category-form"
        onSubmit={handelAddNewSubFoodCategory}
      >
        <input
          type="text"
          id="sub_category_name"
          name="sub_category_name"
          placeholder="שם תת קטגוריה"
          required
        />
        <label htmlFor="food_category_id">קטגורית מזון</label>
        <select id="food_category_id" name="food_category_id">
          <option value="">בחר קטגורית מזון</option>
          {foodCategories &&
            foodCategories.map((category) => (
              <option
                key={category.food_category_id}
                value={category.food_category_id}
              >
                {category.food_category_name}
              </option>
            ))}
        </select>
        <label htmlFor="navbar_item_id">קטגורית תפריט</label>
        <select id="navbar_item_id" name="navbar_item_id">
          {navBarItems.map((item: any) => (
            <option value={item.navbar_item_id}>{item.label}</option>
          ))}
        </select>
        <RamiBtn type="submit">הוסף קטגוריה</RamiBtn>
        <RamiBtn onClick={onClose}>סגור</RamiBtn>
      </form>
    </div>
  );
};

export default AddNewSubFoodCategory;
