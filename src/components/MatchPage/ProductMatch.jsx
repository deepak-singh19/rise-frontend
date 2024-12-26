import { useEffect, useState } from "react";
import MentorCard from "./MentorCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { constants } from "../../utility/constants";
import ProductCard from "./ProductCard";

export default function ProductMatch() {
  const [products, setProducts] = useState([]);
  const { axiosGet } = useAxiosPrivate();
  useEffect(() => {
    const fetchAllMentors = async () => {
      try {
        const response = await axiosGet(constants.GETALLPRODUCTS);
        // console.log(response.products);
        const products = response.products;
        const filteredProducts = products.filter(
          (product) => product.skills?.length > 0,
        );
        const updateFilteredProducts = filteredProducts.map((product) => {
          const skills = product.skills.join(", ");
          return {
            _id: product._id,
            companyName: product.companyName,
            fullName: product.fullName,
            email: product.email,
            skills: skills,
            experience: product.durationOfMentorship,
          };
        });
        setProducts(updateFilteredProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllMentors();
  }, []);
  return (
    <section className="text-center">
      <h1 className="text-4xl md:text-6xl">Products</h1>
      <div className="flex flex-col items-center">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            productId={product._id}
            companyName={product.companyName}
            fullName={product.fullName}
            email={product.email}
            skills={product.skills}
            experience={product.experience}
          />
        ))}
      </div>
    </section>
  );
}
