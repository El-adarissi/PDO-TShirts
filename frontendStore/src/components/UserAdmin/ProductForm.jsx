/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import Orders from "./Orders";

function ProductForm({ product = null }) {
  const [name, setName] = useState(product ? product.name : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [richDescription, setRichDescription] = useState(
    product ? product.richDescription : ""
  );
  const [image, setImage] = useState(product ? product.image : "");
  const [price, setPrice] = useState(product ? product.price : 0);
  const [oldprice, setOldPrice] = useState(product ? product.oldprice : 0);
  const [rating, setRating] = useState(product ? product.rating : 0);
  const [isFeatured, setIsFeatured] = useState(
    product ? product.isFeatured : false
  );
  const [category, setCategory] = useState(product ? product.Category : "ALL");
  const [colorOptions, setcolorOptions] = useState(
    product ? product.colorOptions : []
  );
  const [sizeOptions, setsizeOptions] = useState(
    product ? product.sizeOptions : []
  );
  const [imagePreview, setImagePreview] = useState(
    product ? product.image : ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price) {
      alert("Please fill in all required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("richDescription", richDescription);
    formData.append("price", price);
    formData.append("oldprice", oldprice);
    formData.append("rating", rating);
    formData.append("isFeatured", isFeatured);
    formData.append("Category", category);
    formData.append("colorOptions", JSON.stringify(colorOptions));
    formData.append("sizeOptions", JSON.stringify(sizeOptions));

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/products",
        formData
      );
      console.log("Product saved:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addColorOption = () => {
    setcolorOptions([...colorOptions, { value: "", color: "" }]);
  };

  const updateColorOption = (index, field, value) => {
    const updatedOptions = colorOptions.map((option, i) =>
      i === index ? { ...option, [field]: value } : option
    );
    setcolorOptions(updatedOptions);
  };

  const addSizeOption = () => {
    setsizeOptions([...sizeOptions, { size: "" }]);
  };

  const updateSizeOption = (index, value) => {
    const updatedOptions = sizeOptions.map((option, i) =>
      i === index ? { ...option, size: value } : option
    );
    setsizeOptions(updatedOptions);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-black shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-semibold mb-4">
        {product ? "Update Product" : "Add New Product"}
      </h2>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <textarea
        placeholder="Rich Description"
        value={richDescription}
        onChange={(e) => setRichDescription(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="max-w-xs mb-4 rounded"
        />
      )}
      <br></br>
      <span>Price</span>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        required
      />
      <span>Old Price</span>
      <input
        type="number"
        placeholder="Old Price"
        value={oldprice}
        onChange={(e) => setOldPrice(parseFloat(e.target.value))}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <span>Rating</span>
      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => {
          const value = parseFloat(e.target.value);
          if (value >= 0 && value <= 5) {
            setRating(value);
          }
        }}
        min="0"
        max="5"
        step="0.1" // Allows for decimal increments
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="mr-2"
          />
          Is Featured
        </label>
      </div>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      >
        <option value="ALL">All</option>
        <option value="Hoodies">Hoodies</option>
        <option value="TShirts">T-Shirts</option>
        <option value="Caps">Caps</option>
      </select>

      <div className="mb-4">
        <h4>Color Options</h4>
        {colorOptions.map((option, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="Color Name"
              value={option.value}
              onChange={(e) =>
                updateColorOption(index, "value", e.target.value)
              }
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="color"
              value={option.color}
              onChange={(e) =>
                updateColorOption(index, "color", e.target.value)
              }
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addColorOption}
          className="text-blue-500"
        >
          Add Color Option
        </button>
      </div>

      <div className="mb-4">
        <h4>Size Options</h4>
        {sizeOptions.map((option, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="Size"
              value={option.size}
              onChange={(e) => updateSizeOption(index, e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        ))}
        <button type="button" onClick={addSizeOption} className="text-blue-500">
          Add Size Option
        </button>
      </div>

      <button
        type="submit"
        className="w-full p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {product ? "Update Product" : "Add Product"}
      </button>

      <div className="mt-20">
        <Orders/>
    </div>
    </form>
    
    
  

  );
}

export default ProductForm;
