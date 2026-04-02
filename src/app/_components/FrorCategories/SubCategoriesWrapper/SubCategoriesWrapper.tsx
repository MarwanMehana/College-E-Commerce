import React from "react";
import { GetAllSubCategoriesOnCategory } from "../../../../api/SubCategories/GetAllSubCategoriesOnCategory";

const SubCategoriesWrapper = async ({
  categoryId,
  categoryName,
}: {
  categoryId: string;
  categoryName: string;
}) => {
  const subCategories = await GetAllSubCategoriesOnCategory(categoryId);

  return (
    <>test</>
    // <div className="p-3 border rounded-lg bg-gray-50">
    //   <h3 className="font-bold text-green-700">{categoryName}</h3>
    //   <ul className="mt-2 space-y-1">
    //     {subCategories.map((sub) => (
    //       <li key={sub._id} className="text-sm text-gray-700">
    //         {sub.name}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default SubCategoriesWrapper;
