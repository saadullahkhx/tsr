import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import { useDispatch, useSelector } from "react-redux";
import { newProduct, clearErrors } from "../../redux/actions/productsActions";
import { toast } from "react-toastify";
import { NEW_PRODUCT_RESET } from "../../redux/constants/productsConstants";
import { Link } from "react-router-dom";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import "./NewProduct.css";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

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
  const { loading, error, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product posted");
      dispatch({ type: NEW_PRODUCT_RESET });

      setName("");
      setPrice(0);
      setDescription("");
      setCategory("");
      setStock(0);
      setSeller("");
      setImages([]);
      setImagesPreview([]);
    }
  }, [dispatch, error, success]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

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

    images.forEach((image) => setImages([...images, image]));

    console.log(images);

    dispatch(
      newProduct({ name, price, description, category, stock, seller, images })
    );
  };

  return (
    <React.Fragment>
      <Link to="#" onClick={onOpenModal}>
        Add Product
      </Link>
      <Modal open={open} onClose={onCloseModal}>
        <form className="create-product-form" onSubmit={handleSubmit}>
          <h3>Add Product</h3>
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
          <CustomButton disabled={loading ? true : false}>Create</CustomButton>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default NewProduct;
