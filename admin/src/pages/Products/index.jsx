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
  getTopSalesRequest,
  getPopTagRequest,
} from "../../actions";
import DataTable from "./components/DataTable";
import NewModal from "../../components/UI/Modal";
import TopSalesChart from "./components/Chart/TopSalesChart";
import PopulateTagsChart from "./components/Chart/PopulateTagsChart";
import axios from "../../helper/axios";
import { BsXSquare, BsSearch } from "react-icons/bs";
import "./style.scss";
import "antd/dist/antd.css";
import { Select } from "antd";
import { Spinner } from "../../components/UI/Spinner";
import { useTranslation } from "react-i18next";
import { THIS_MONTH } from "../../constant";

const { Option } = Select;

/**
 * @author
 * @function Home
 **/

const Products = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { products, loading, query } = useSelector((state) => state.products);
  const [showAddModal, setShowAddModal] = useState(false);

  const [productMonth, setProductMonth] = useState(new Date().getMonth() + 1);
  const [date, setDate] = useState(7);

  const [name, setName] = useState("");
  const [listedPrice, setListedPrice] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(null);

  const [tags, setTags] = useState([]);
  const [imgUrl, setUrl] = useState(null);
  const [photos, setPhotos] = useState([]);

  const imageInputRef = useRef();
  const tagRef = useRef();

  const datePick = [
    { day: 7, title: `${t("a week ago")}` },
    { day: 15, title: `${t("2 week ago")}` },
    { day: 30, title: `${t("1 month ago")}` },
    { day: 93, title: `${t("3 month ago")}` },
    { day: 183, title: `${t("6 month ago")}` },
    { day: 365, title: `${t("1 year ago")}` },
  ];
  const monthList = [
    { value: 1, title: `${t("January")}` },
    { value: 2, title: `${t("Febuary")}` },
    { value: 3, title: `${t("March")}` },
    { value: 4, title: `${t("April")}` },
    { value: 5, title: `${t("May")}` },
    { value: 6, title: `${t("Jun")}` },
    { value: 7, title: `${t("July")}` },
    { value: 8, title: `${t("August")}` },
    { value: 9, title: `${t("September")}` },
    { value: 10, title: `${t("October")}` },
    { value: 11, title: `${t("November")}` },
    { value: 12, title: `${t("December")}` },
  ];

  useEffect(() => {
    dispatch(getProductsRequest({ query }));
    dispatch(getTopSalesRequest({ month: THIS_MONTH }));
    dispatch(getPopTagRequest({ daysAgo: 7 }));
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

  const productSelectMonth = (value) => {
    dispatch(getTopSalesRequest({ month: Number(value) }));
    setProductMonth(value);
  };

  const tagSelectDate = (value) => {
    dispatch(getPopTagRequest({ daysAgo: value }));
    setDate(value);
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

  const closeModal = () => {
    setShowAddModal(false);
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

  const renderTopSalesChart = (
    <div className='chart'>
      <h4>{`${t("Product sold of month")} ${productMonth}`} </h4>
      <div className='chart-header'>
        <div className='select'>
          <Select
            defaultValue={t("Month")}
            style={{ width: 120 }}
            onChange={productSelectMonth}
          >
            {monthList.map((mont) => {
              return <Option value={mont.value}>{mont.title}</Option>;
            })}
          </Select>
        </div>
      </div>
      <TopSalesChart totalSale />
    </div>
  );

  const renderPopulateTagsChart = (
    <div className='chart'>
      <h4>{t("Hot category")}</h4>
      <div className='chart-header'>
        <div className='select'>
          <Select
            defaultValue={t("Time")}
            style={{ width: 120 }}
            onChange={tagSelectDate}
          >
            {datePick.map((dat) => {
              return <Option value={dat.day}>{dat.title}</Option>;
            })}
          </Select>
        </div>
      </div>

      <PopulateTagsChart />
    </div>
  );

  if (loading) {
    return (
      <Layout sidebar>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout sidebar>
      <section className='products-container'>
        {renderTopSalesChart}
        {renderPopulateTagsChart}
        <div className='products-container__table'>
          <Button onClick={() => setShowAddModal(true)}>Add new Product</Button>
          <DataTable data={products} deleteProduct={handleDeleteProduct} />
        </div>
        {renderAddProductModal}
      </section>
    </Layout>
  );
};

export default Products;
