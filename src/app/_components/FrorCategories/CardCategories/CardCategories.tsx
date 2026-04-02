import React from "react";

// type
import { GetAllSubCategoriesOnCategory } from "../../../../api/SubCategories/GetAllSubCategoriesOnCategory";
import Cardsubcategories from "../Cardsubcategories/Cardsubcategories";
import { Category } from "../../../../Types/product.t";

const CardCategories = async ({ category }: { category: Category }) => {
  const subCategories = await GetAllSubCategoriesOnCategory(category._id);
  return (
    <Cardsubcategories category={category} subCategories={subCategories} />
  );
};

export default CardCategories;
