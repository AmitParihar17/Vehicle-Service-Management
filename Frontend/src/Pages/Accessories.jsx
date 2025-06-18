import ProductCard from "../Components/ProductCard"; 
import { UseAppContext } from "../Context/AppContext";

const Accessories = () => {
  const {products} = UseAppContext()
  return (
    <div className="p-4 mt-15">
      <h2 className="text-xl font-bold mb-4">All Accessories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-5">
        {products
          .filter((product) => product.inStock)
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Accessories;
