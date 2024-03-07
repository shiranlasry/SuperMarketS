import React from "react";
import { useAppDispatch } from "../../../../app/hook";
import { addNewFoodCategoryApi } from "../../../../features/api/categoriesAPI";
import RamiBtn from "../../../../components/RamiBtn/RamiBtn";
import "./AddNewFoodCategory.scss";

interface AddNewFoodCategoryProps {
  onClose: () => void;
}

const AddNewFoodCategory: React.FC<AddNewFoodCategoryProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const hendelAddNewFoodCategory = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      e.preventDefault();
      const category_name = (e.target as HTMLFormElement).category_name.value;

      await addNewFoodCategoryApi(category_name);
      // Handle the action object here if needed
    } catch (error) {
      console.error("Error addNewProductInventories:", error);
    }
  };

  return (
    <div className="add-new-category-main">
      <h1 className="add-food-category-title">הוספת קטגורית מזון חדשה</h1>
      <form
        className="add-new-category-form"
        onSubmit={hendelAddNewFoodCategory}
      >
        <input
          placeholder="שם קטגוריה"
          type="text"
          id="category_name"
          name="category_name"
          required
        />

        <RamiBtn type="submit">הוסף קטגוריה</RamiBtn>
        <RamiBtn onClick={onClose}>סגור</RamiBtn>
      </form>
    </div>
  );
};

export default AddNewFoodCategory;
