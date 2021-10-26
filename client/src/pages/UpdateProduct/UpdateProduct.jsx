import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  getProductDetails,
  clearErrors,
} from "../../redux/actions/productsActions";
import "./UpdateProduct.css";

import { toast } from "react-toastify";
import { UPDATE_PRODUCT_RESET } from "../../redux/constants/productsConstants";

import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";

const UpdateProduct = ({ match }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();

  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

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

  const productId = match.params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setSeller(product.seller);
      setOldImages(product.images);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, isUpdated, productId, product, updateError]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (images.length > 0) {
      images.forEach((image) => setImages([...images, image]));

      dispatch(
        updateProduct(productId, {
          name,
          price,
          description,
          category,
          stock,
          seller,
          images,
        })
      );
    } else {
      dispatch(
        updateProduct(productId, {
          name,
          price,
          description,
          category,
          stock,
          seller,
        })
      );
    }
  };

  return (
    <React.Fragment>
      <form className="update-product-form" onSubmit={handleSubmit}>
        <h3>Update Product # {productId}</h3>
        <CustomInput
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <CustomInput
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <CustomInput
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <CustomInput
          placeholder="Brand"
          value={seller}
          onChange={(e) => setSeller(e.target.value)}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Description..."
          style={{ width: "500px", height: "150px", margin: ".5rem 0" }}
        />

        <select
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.value}
            </option>
          ))}
        </select>
        <CustomInput
          type="file"
          name="product_images"
          onChange={handleChange}
          multiple
        />
        <div style={{ display: "flex" }}>
          {imagesPreview.map((img) => (
            <img src={img} key={img} alt="preview" width="55" height="55" />
          ))}
        </div>
        <CustomButton disabled={loading ? true : false}>Update</CustomButton>
      </form>
    </React.Fragment>
  );
};

export default UpdateProduct;
