import React from "react";

// api
import { GetAllCategories } from "../../api/Categories/GetAllCategories";

// ui
import CardCategories from "../_components/FrorCategories/CardCategories/CardCategories";

const Categories = async () => {
  const categories = await GetAllCategories();

  return (
    <section className="grid items-center p-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories && categories.length > 0 ? (
          categories.map((category, index: number) => (
            <CardCategories key={index} category={category} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No categories available.
          </p>
        )}
      </div>
    </section>
  );
};

export default Categories;
