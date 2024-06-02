import React from "react";

const ProductDescription = ({ product }) => {
  return (
    <div className="p-3">
      <h2 className="font-semibold text-gray-700 text-lg">
        {product?.description}
      </h2>
    </div>
  );
};

export default ProductDescription;
