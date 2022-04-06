import React, { useEffect, useState, useRef } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import {
  getProductsRequest,
  updateProductsRequest,
  addProductsRequest,
  deleteProductRequest,
} from "../../actions";
import DataTable from "./components/DataTable";
import NewModal from "../../components/UI/Modal";
import axios from "../../helper/axios";
import { BsXSquare, BsSearch } from "react-icons/bs";
import "./style.scss";

/**
 * @author
 * @function Home
 **/

const Products = (props) => {
  const dispatch = useDispatch();
  const { products, loading, query } = useSelector((state) => state.products);
  const [productDetails, setProductDetails] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailmodal, setShowDetailModal] = useState(false);

  const [name, setName] = useState("");
  const [listedPrice, setListedPrice] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(null);
  const [isHot, setIsHot] = useState(false);
  const [inSlider, setInslider] = useState(false);
  const [tags, setTags] = useState([]);
  const [imgUrl, setUrl] = useState(null);
  const [photos, setPhotos] = useState([]);

  const imageInputRef = useRef();
  const tagRef = useRef();

  useEffect(() => {
    dispatch(getProductsRequest({ query }));
  }, []);

  const addProductForm = () => {
    const product = {
      name,
      discountPrice,
      listedPrice,
      description,
      quantity,
      tags,
      avatar: imgUrl,
      photos,
    };
    setShowAddModal(false);
    dispatch(addProductsRequest(product));
  };

  const updateProductForm = () => {
    const product = {
      productId: productDetails._id,
      name,
      discountPrice,
      listedPrice,
      description,
      quantity,
      tags,
      is_hot: isHot,
      in_slider: inSlider,
      avatar: imgUrl,
      photos,
    };
    setShowDetailModal(false);
    dispatch(updateProductsRequest({ updateProduct: product }));
  };

  const handleProductDetails = (product) => {
    const {
      name,
      avatar,
      discountPrice,
      listedPrice,
      photos,
      quantity,
      tags,
      is_hot,
      in_slider,
      description,
    } = product;
    setProductDetails(product);
    setName(name);
    setUrl(avatar);
    setDiscountPrice(discountPrice);
    setListedPrice(listedPrice);
    setPhotos(photos);
    setQuantity(quantity);
    setIsHot(is_hot);
    setInslider(in_slider);
    setTags(tags);
    setDescription(description);
    setShowDetailModal(true);
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProductRequest({ productId }));
  };

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file, file.name);

    try {
      const res = await axios.post("/image", formData);

      if (res.data.success) {
        setUrl(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePhotosInput = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file, file.name);

    try {
      const res = await axios.post("/image", formData);

      if (res.data.success) {
        setPhotos([...photos, res.data.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeTag = (value) => {
    setTags([...tags].filter((tag) => tag !== value));
  };

  const removePhoto = (value) => {
    setPhotos([...photos].filter((photo) => photo !== value));
  };

  const handleTagsInput = () => {
    if (tagRef.current.value == "") return;
    setTags([...tags, tagRef.current.value]);
    tagRef.current.value = "";
  };

  const submitModal = (e) => {
    e.preventDefault();
    addProductForm();
    setShowAddModal(false);
  };

  const submitUpdateProduct = (e) => {
    e.preventDefault();
    updateProductForm();
    setShowDetailModal(false);
  };
  const closeModal = () => {
    setShowAddModal(false);
    setShowDetailModal(false);
  };

  const renderAddProductModal = (
    <NewModal
      title={"Add new Product"}
      visible={showAddModal}
      onOk={submitModal}
      onCancel={closeModal}
    >
      <div className='addproduct-modal'>
        <input
          type='file'
          className='custom-file-input'
          onChange={handleFileInput}
          ref={imageInputRef}
        />
        <div>
          {imgUrl && <img className='avatar' alt='avatar' src={imgUrl} />}
        </div>
        <label>
          Name
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='form-control-sm'
          />
        </label>
        <label>
          List Price
          <Input
            value={listedPrice}
            onChange={(e) => setListedPrice(e.target.value)}
            className='form-control-sm'
          />
        </label>
        <label>
          Discount Price
          <Input
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            className='form-control-sm'
          />
        </label>

        <label>
          Description
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='form-control-sm'
          />
        </label>
        <label>
          Quantity
          <Input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='form-control-sm'
          />
        </label>
        <label>
          Add tag
          <div>
            <input type='text' ref={tagRef} />
            <button onClick={handleTagsInput}>Add </button>
          </div>
        </label>

        <div style={{ marginTop: "4px" }}>
          {tags.map((tag) => (
            <span className='tag'>
              {tag}
              <BsXSquare onClick={() => removeTag(tag)} />
            </span>
          ))}
        </div>
        <h4>Photos</h4>
        <input
          type='file'
          className='custom-file-input'
          onChange={handlePhotosInput}
        />
        <div style={{ display: "flex" }}>
          {photos.map((photo) => (
            <img
              className='avatar'
              alt='photo'
              src={photo}
              onClick={() => removePhoto(photo)}
            />
          ))}
        </div>
      </div>
    </NewModal>
  );

  const renderProductDetailModal = () => {
    return (
      <NewModal
        title={"Add new Product"}
        visible={showDetailmodal}
        onOk={submitUpdateProduct}
        onCancel={closeModal}
      >
        <div className='productdetail-modal'>
          <input
            type='file'
            className='custom-file-input'
            onChange={handleFileInput}
            ref={imageInputRef}
          />
          <div>
            {imgUrl && <img className='avatar' alt='avatar' src={imgUrl} />}
          </div>
          <label>
            Name
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='form-control-sm'
            />
          </label>
          <label>
            List Price
            <Input
              value={listedPrice}
              onChange={(e) => setListedPrice(e.target.value)}
              className='form-control-sm'
            />
          </label>
          <label>
            Discount Price
            <Input
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              className='form-control-sm'
            />
          </label>
          <div>
            <label>
              Is hot
              <input
                type='checkbox'
                checked={isHot ? true : false}
                onChange={() => setIsHot(!isHot)}
                className='form-control-sm'
              />
            </label>
            <label>
              Inslider
              <input
                type='checkbox'
                checked={inSlider ? true : false}
                onChange={() => setInslider(!inSlider)}
                className='form-control-sm'
              />
            </label>
          </div>

          <label>
            Description
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='form-control-sm'
            />
          </label>
          <label>
            Quantity
            <Input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className='form-control-sm'
            />
          </label>
          <label>
            Add tag
            <div>
              <input type='text' ref={tagRef} />
              <button onClick={handleTagsInput}>Add </button>
            </div>
          </label>

          <div style={{ marginTop: "4px" }}>
            {tags.map((tag) => (
              <span className='tag'>
                {tag}
                <BsXSquare onClick={() => removeTag(tag)} />
              </span>
            ))}
          </div>
          <h4>Photos</h4>
          <input
            type='file'
            className='custom-file-input'
            onChange={handlePhotosInput}
          />
          <div style={{ display: "flex" }}>
            {photos.map((photo) => (
              <img
                className='avatar'
                alt='photo'
                src={photo}
                onClick={() => removePhoto(photo)}
              />
            ))}
          </div>
        </div>
      </NewModal>
    );
  };

  return (
    <Layout sidebar>
      <Button onClick={() => setShowAddModal(true)} title='Add new product' />
      <DataTable
        data={products}
        getProductDetails={handleProductDetails}
        deleteProduct={handleDeleteProduct}
      />
      {renderAddProductModal}
      {productDetails && renderProductDetailModal(productDetails)}
    </Layout>
  );
};

export default Products;
