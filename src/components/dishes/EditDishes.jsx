import { useEffect, useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { editFoodListApi } from "../../services/allApi";
import { editResponceContext } from "../../pages/context/ContextShare";
import { BASE_URL } from "../../services/baseUrl";

const EditDishes = ({ onClose, dish }) => {
    const [preview, setPreview] = useState("");
    const { editResponce, setEditResponce } = useContext(editResponceContext);
    const [formData, setFormData] = useState({
        foodId: dish?.id,
        food_name: dish?.food_name,
        description: dish?.description,
        food_category_obj: dish?.food_category_obj,
        price: dish?.price,
        food_image: dish?.food_image,
        time_taken: dish?.time_taken,
        is_available: dish?.is_available
    });

    useEffect(() => {
        if (dish && dish.food_image) {
            if (typeof dish.food_image === "string") {
                const imageUrl = `${BASE_URL}${dish.food_image}`;
                setPreview(imageUrl);
                fetch(imageUrl)
                    .then((res) => res.blob())
                    .then((blob) => {
                        const file = new File([blob], "image.jpg", { type: blob.type });
                        setFormData((prev) => ({ ...prev, food_image: file }));
                    });
            }
        }
    }, [dish]);

    // 🔹 Drag & Drop Handling
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        multiple: false,
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                setFormData({ ...formData, food_image: file });

                const reader = new FileReader();
                reader.onloadend = () => setPreview(reader.result);
                reader.readAsDataURL(file);
            }
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { foodId, food_name, description, food_category_obj, price, food_image, time_taken, is_available } = formData;

        if (food_name && description && food_category_obj && price && food_image && time_taken && is_available) {
            const editDish = new FormData();
            editDish.append("food_name", food_name);
            editDish.append("description", description);
            editDish.append("food_category_obj", food_category_obj);
            editDish.append("price", price);

            // Append file only if a new image is selected
            if (food_image instanceof File) {
                editDish.append("food_image", food_image);
            }

            editDish.append("time_taken", time_taken);
            editDish.append("is_available", is_available);
            editDish.append("owner", localStorage.getItem("owner"));

            try {
                const token = localStorage.getItem("accessToken");
                const result = await editFoodListApi(foodId, editDish, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (result.status === 200) {
                    onClose();
                    setEditResponce(result);
                } else {
                    alert(result.response.data);
                }
            } catch (err) {
                console.log(err.response);
            }
        }
    };
    
    return (
        <motion.div
            className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center h-[30rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ marginTop: '5rem' }}
        >
            <motion.div
                className="bg-white rounded-lg shadow-lg p-6 w-96"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">Edit Dish</h2>
                    <button
                        className="text-gray-600 hover:text-gray-800"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Dish Name
                        </label>
                        <input
                            type="text"
                            name="food_name"
                            value={formData.food_name}
                            onChange={e => setFormData({ ...formData, food_name: e.target.value })}
                            className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <input
                            type="number"
                            name="category"
                            value={formData.food_category_obj}
                            onChange={e => setFormData({ ...formData, food_category_obj: e.target.value })}
                            className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                            className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Food Image</label>
                        <div
                            {...getRootProps()}
                            className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                            <input {...getInputProps()} />
                            {preview ? (
                                <img src={preview} alt="Preview" className="max-h-40 mx-auto" />
                            ) : (
                                <p className="text-gray-500">Drag & drop an image here, or click to select one</p>
                            )}
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Time taken
                        </label>
                        <input
                            type="number"
                            name="time_taken"
                            value={formData.time_taken}
                            onChange={e => setFormData({ ...formData, time_taken: e.target.value })}
                            className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            required
                        />
                    </div>
                    <div className="mt-4 flex gap-3 items-center">
                        <label className="block text-sm font-medium text-gray-700 mr-4">
                            Available
                        </label>
                        <input
                            type="radio"
                            name="is_available"
                            value="available"
                            checked={formData.is_available === "available"}
                            onChange={(e) => setFormData({ ...formData, is_available: e.target.value })}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 text-gray-900"
                        />
                        <label className="block text-sm font-medium text-gray-700 mr-4">
                            Unavailable
                        </label>
                        <input
                            type="radio"
                            name="is_available"
                            value="unavailable"
                            checked={formData.is_available === "unavailable"}
                            onChange={(e) => setFormData({ ...formData, is_available: e.target.value })}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 text-gray-900"
                        />
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Edit Dish
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default EditDishes;