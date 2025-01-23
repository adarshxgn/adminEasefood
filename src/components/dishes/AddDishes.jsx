import { useState } from "react";
import { motion } from "framer-motion";

const AddDishes = ({ onClose }) => {
    const [formData, setFormData] = useState({
        food_name: "",
        category: "",
        price: "",
        is_available: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dish added:", formData);
        onClose(); // Close the modal after submission
    };

    return (
        <motion.div
            className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white rounded-lg shadow-lg p-6 w-96"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">Add Dish</h2>
                    <button
                        className="text-gray-600 hover:text-gray-800"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Dish Name
                        </label>
                        <input
                            type="text"
                            name="food_name"
                            value={formData.food_name}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mt-4 flex items-center">
                        <label className="block text-sm font-medium text-gray-700 mr-4">
                            Available
                        </label>
                        <input
                            type="checkbox"
                            name="is_available"
                            checked={formData.is_available}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
                            Add Dish
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddDishes;
