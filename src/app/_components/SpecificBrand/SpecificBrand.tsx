import React from "react";
import Image from "next/image";

// UI
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";

//API
import { GetSpecificBrand } from "../../../api/Brands/GetSpecificBrand";

const SpecificBrand = async ({id}:{id:string}) => {
  const specificBrand = await GetSpecificBrand(id);
  return (
    <DialogContent className="bg-white flex justify-center">
      <DialogHeader>
        <DialogTitle className="text-center">{specificBrand.name}</DialogTitle>
        <DialogDescription>
          <Image
            src={specificBrand.image}
            alt={specificBrand.name}
            width={300}
            height={300}
          />
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};

export default SpecificBrand;

