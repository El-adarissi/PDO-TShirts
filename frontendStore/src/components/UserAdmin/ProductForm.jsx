/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import Orders from "./Orders";
function ProductForm({ product = null }) {
  const [showDialog, setShowDialog] = useState(false);

  const [name, setName] = useState(product ? product.name : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [richDescription, setRichDescription] = useState(
    product ? product.richDescription : ""
  );
  const [images, setImages] = useState(product ? product.images : []);
  const [imagePreviews, setImagePreviews] = useState([]);
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
  const [selectedSizes, setSelectedSizes] = useState(
    product ? product.sizeOptions.map((size) => size.value) : []
  );

  // Define size options for each category, now including value and size
  const sizeOptionsMap = {
    Hoodies: [
      { size: "S", value: "S" },
      { size: "M", value: "M" },
      { size: "L", value: "L" },
      { size: "XL", value: "XL" },
      { size: "2XL", value: "2XL" },
      { size: "3XL", value: "3XL" },
    ],
    TShirts: [
      { size: "S", value: "S" },
      { size: "M", value: "M" },
      { size: "L", value: "L" },
      { size: "XL", value: "XL" },
      { size: "2XL", value: "2XL" },
      { size: "3XL", value: "3XL" },
    ],
    Caps: [
      { size: "S", value: "S" },
      { size: "M", value: "M" },
      { size: "L", value: "L" },
    ],
  };

  // Update size options based on selected category
  useEffect(() => {
    setsizeOptions(sizeOptionsMap[category] || []);
    setSelectedSizes([]);
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all required fields
    if (
      !name ||
      !description ||
      !price ||
      !rating ||
      !category ||
      !images.length ||
      selectedSizes.length === 0
    ) {
      setShowDialog(true);
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
    formData.append("sizeOptions", JSON.stringify(selectedSizes));

    // Append each image to formData (including previously added images and newly selected ones)
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/products",
        formData
      );
      console.log("Product saved:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
    resetForm();
  };

  // Function to reset the form fields
  const resetForm = () => {
    setName("");
    setDescription("");
    setRichDescription("");
    setImages([]);
    setImagePreviews([]);
    setPrice(0);
    setOldPrice(0);
    setRating(0);
    setIsFeatured(false);
    setCategory("ALL");
    setcolorOptions([]);
    setsizeOptions([]);
    setSelectedSizes([]);
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = [...images, ...files];
    setImages(updatedImages);
    const previews = updatedImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleImageDelete = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    const updatedPreviews = updatedImages.map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviews(updatedPreviews);
  };

  const handleSizeChange = (e) => {
    const sizeValue = e.target.value;
    const checked = e.target.checked;
    setSelectedSizes((prevSizes) =>
      checked
        ? [...prevSizes, sizeValue]
        : prevSizes.filter((s) => s !== sizeValue)
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-black shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>

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

      {/* Image upload input */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="mb-4"
      />

      {/* Display selected image previews */}
      {imagePreviews.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative inline-block mb-4">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="max-w-full h-auto rounded"
                style={{ maxWidth: "200px" }}
              />
              <button
                type="button"
                onClick={() => handleImageDelete(index)}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
              >
                X
              </button>
            </div>
          ))}
        </div>
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
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
        min="0"
        max="5"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <div className="mb-4">
        <size className="block mb-2">Category</size>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="ALL">ALL</option>
          <option value="Hoodies">Hoodies</option>
          <option value="TShirts">TShirts</option>
          <option value="Caps">Caps</option>
        </select>
      </div>

      {/* Size options */}
      <div className="mb-4">
        <span className="block mb-2">Size Options</span>
        {sizeOptions.length > 0 ? (
          sizeOptions.map((size) => (
            <div key={size.value} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                value={size.value}
                checked={selectedSizes.includes(size.value)}
                onChange={handleSizeChange}
                className="mr-2"
              />
              <span>{size.size}</span>
            </div>
          ))
        ) : (
          <p>No sizes available for the selected category.</p>
        )}
      </div>
      <div className="mb-4">
        <h4>Color Options</h4>
        {colorOptions.map((option, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="Color Name"
              value={option.value}
              onChange={(e) =>
                setcolorOptions(
                  colorOptions.map((opt, i) =>
                    i === index ? { ...opt, value: e.target.value } : opt
                  )
                )
              }
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="color"
              value={option.color}
              onChange={(e) =>
                setcolorOptions(
                  colorOptions.map((opt, i) =>
                    i === index ? { ...opt, color: e.target.value } : opt
                  )
                )
              }
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setcolorOptions([...colorOptions, { value: "", color: "" }])
          }
          className="text-blue-500"
        >
          Add Color Option
        </button>
      </div>
      {/* Modal for missing fields */}
      {showDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-black">
              Missing Fields
            </h3>
            <p>Please fill in all required fields.</p>
            <button
              onClick={() => setShowDialog(false)}
              className="mt-4 bg-blue-500 text-black px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Product
      </button>
      <div className="mt-16">
        <Orders />
      </div>
    </form>
  );
}

export default ProductForm;
