import "./NavBarItemProducts.scss";
import { Product } from "./types"; // Assuming you have defined Product interface in a separate file
import { productsByNavbarItemIDSelector } from "../../../features/products/productsSlice";
import { useAppSelector } from "../../../app/hook";
import ProductCard from "../../ProductCard/ProductCard";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const NavBarItemProducts = () => {
  const { title } = useParams<{ navbarItemId: string; title: string }>();
  const productsByNavbarItemID = useAppSelector(productsByNavbarItemIDSelector);
  const navigate = useNavigate();
  console.log("title", title);
  if (title === "מבצעים") {
    navigate("/sales");
  }

  // Group products by sub_food_category_name
  const groupedProducts: { [key: string]: Product[] } | undefined =
    productsByNavbarItemID?.reduce(
      (acc: { [key: string]: Product[] }, product: Product) => {
        if (!acc[product.sub_food_category_name]) {
          acc[product.sub_food_category_name] = [];
        }
        acc[product.sub_food_category_name].push(product);
        return acc;
      },
      {}
    );

  return (
    <div className="category-visual-container">
      <p className="title">{title}</p>
      {groupedProducts &&
        Object.entries(groupedProducts).map(([subcategory, products]) => (
          <div key={subcategory}>
            <h2 className="subcategory-title">{subcategory}</h2>
            <div className="row sub-cat-prods">
              {products.map((product) => (
                <div
                  key={product.product_id}
                  className="col-lg-2 col-md-3 col-sm-4 col-6"
                >
                  <div className="product-card-wrapper">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default NavBarItemProducts;
