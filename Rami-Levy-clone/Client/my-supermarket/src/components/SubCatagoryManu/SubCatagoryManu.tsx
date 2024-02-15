import React, { useEffect } from "react";
import { subFoodCategoriesSelector } from "../../features/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { get_SUB_FoodCategoriesApi } from "../../features/categories/categoriesAPI";
import SabCatagoryItem from "../SubCatagoryItem/SubCatagoryItem";
import "./subCatagoryManu.scss";

interface SubCatagoryManuProps {
  navbar_item_id: number; // Add a prop for navbar_item_id
}

const SubCatagoryManu: React.FC<SubCatagoryManuProps> = ({
  navbar_item_id,
}) => {
  const dispatch = useAppDispatch();
  const subFoodCategories = useAppSelector(subFoodCategoriesSelector);

  useEffect(() => {
    if (!subFoodCategories || subFoodCategories.length === 0) {
      dispatch(get_SUB_FoodCategoriesApi());
    }
  }, []);

  // Filter subFoodCategories based on navbar_item_id
  const filteredCategories =
    subFoodCategories?.filter(
      (item) => item.navbar_item_id === navbar_item_id
    ) || [];

  // Group subcategories by their category IDs
  const categoriesMap = filteredCategories.reduce((map, category) => {
    if (!map.has(category.food_category_id)) {
      map.set(category.food_category_id, {
        categoryName: category.food_category_name,
        subcategories: [],
      });
    }
    map.get(category.food_category_id)?.subcategories.push(category);
    return map;
  }, new Map<number, { categoryName: string; subcategories: typeof filteredCategories }>());
  console.log(categoriesMap);
  return (
    <div className="sub-category-menu">
      {Array.from(categoriesMap.entries()).map(([categoryId, categoryData], index) => (
        <div key={index}>
          <h3>{categoryData.categoryName}</h3>
          <ul className="sub-cat-items">
            {categoryData.subcategories.map((item, subIndex) => (
              <SabCatagoryItem key={subIndex} item={item} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SubCatagoryManu;
