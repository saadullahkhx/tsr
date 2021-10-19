import React, { useEffect, useState } from "react";
import MetaData from "../../MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/productsActions";
import Card from "../../components/Card/Card";
import "./Homepage.css";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import Select from "react-select";

const Homepage = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");

  const categories = [
    { value: "Mens Watches", label: "Mens Watches" },
    { value: "Womens Watches", label: "Womens Watches" },
    { value: "Mens Perfumes", label: "Mens Perfumes" },
    { value: "Womens Perfumes", label: "Womens Perfumes" },
    { value: "Sun Glasses", label: "Sun Glasses" },
    { value: "Dress belts", label: "Dress belts" },
    { value: "Womens Jewelry", label: "Womens Jewelry" },
    { value: "Womens Sandles", label: "Womens Sandles" },
    { value: "Womens Bags", label: "Womens Bags" },
    { value: "Mens accessories", label: "Mens accessories" },
  ];

  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    totalProducts,
    resultsPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const keyword = match.params.keyword;

  let count = totalProducts;
  if (keyword) {
    count = filteredProductsCount;
  }

  useEffect(() => {
    if (error) return toast.error(error);

    dispatch(getProducts(keyword, currentPage, category));
  }, [dispatch, error, keyword, currentPage, category]);

  return loading ? (
    <Loader />
  ) : (
    <div className="homepage">
      <MetaData title="HOME" />
      <div className="filters-container">
        {keyword ? (
          <div className="filters">
            <div className="categories">
              <ul>
                <h4>Categories</h4>
                {categories.map((category) => (
                  <li
                    key={category.label}
                    className="category-item"
                    onClick={() => setCategory(category.value)}
                  >
                    {category.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
      <div
        className="homepage-content"
        style={keyword ? {} : { width: "100%" }}
      >
        <h1>Our Products</h1>
        {keyword ? (
          <Select
            options={categories}
            className="category-dd"
            placeholder="Select Category"
            value={category}
            isSearchable={false}
            onChange={(val) => setCategory(val.value)}
          />
        ) : null}
        {keyword && products.length < 1 && (
          <p>No products in this category related to search: {keyword}</p>
        )}

        <div className="latest-products-menu">
          {products &&
            products.map((product) => (
              <Card
                name={product.name}
                price={product.price}
                ratings={product.ratings}
                images={product.images}
                key={product._id}
                numOfReviews={product.numOfReviews}
                id={product._id}
                category={product.category}
              />
            ))}
        </div>

        {resultsPerPage <= count && (
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultsPerPage}
            totalItemsCount={totalProducts}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="First"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
          />
        )}

        {products.length > 0 && (
          <strong style={{ marginTop: "0.5rem" }}>Page {currentPage}</strong>
        )}
      </div>
    </div>
  );
};

export default Homepage;
