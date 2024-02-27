import React from 'react'
import { useAppDispatch } from '../../../../app/hook';
import { addNewFoodCategoryApi } from '../../../../features/api/categoriesAPI';

interface AddNewFoodCategoryProps {
    onClose: () => void;
}

const AddNewFoodCategory : React.FC<AddNewFoodCategoryProps> = ({onClose}) => {
const dispatch = useAppDispatch();
const hendelAddNewFoodCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    try { 
        e.preventDefault();
        const category_name = (e.target as HTMLFormElement).category_name.value;
        debugger;
        await addNewFoodCategoryApi(category_name);
        // Handle the action object here if needed
    } catch (error) {
        console.error("Error addNewProductInventories:", error);
    }
}

  return (
    <div>
      <h1>הוספת קטגורית מזון חדשה</h1>
      <form onSubmit={hendelAddNewFoodCategory}>
        <label htmlFor="category_name">שם קטגוריה</label>
        <input type="text" id="category_name" name="category_name" required />
        <button type="submit">הוסף קטגוריה</button>
        <button onClick={onClose}>סגור</button>
      </form>
    </div>
  )
}

export default AddNewFoodCategory
