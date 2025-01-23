import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import AddDishes from "./AddDishes";
import { getFoodListApi } from "../../services/allApi";
import { BASE_URL } from "../../services/baseUrl";

const DishesTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dishes, setDishes] = useState([]); // State to hold the list of dishes
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        // Fetch food list from API on component mount
        const fetchFoodList = async () => {
            try {
                const response = await getFoodListApi();
                setDishes(response.data); // Assuming the API response contains the food list in response.data
            } catch (error) {
                console.error("Error fetching food list:", error);
            }
        };

        fetchFoodList();
    }, []); // Empty dependency array ensures this effect runs once when the component mounts

    // Filter dishes based on search input
    const filteredDishes = dishes.filter((dish) =>
        dish.food_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle delete action
    const handleDelete = (id) => {
        // Implement delete logic here (e.g., API call)
        setDishes((prevDishes) => prevDishes.filter((dish) => dish.id !== id));
    };

    // Handle edit action
    const handleEdit = (id) => {
        // Implement edit logic here
        console.log(`Edit dish with ID: ${id}`);
    };

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex justify-start items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">Dishes</h2>
                <div>
                    <button
                        className="text-lg rounded-lg bg-blue-700 hover:bg-blue-800 text-blue-100 m-5 p-1"
                        onClick={openModal}
                    >
                        Add Dish
                    </button>

                    {isModalOpen && <AddDishes onClose={closeModal} />}
                </div>
                <div className="relative ml-auto">
                    <input
                        type="text"
                        placeholder="Search Dishes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Dish
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-700">
                        {filteredDishes.map((dish) => (
                            <motion.tr
                                key={dish.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-12 w-12">
                                            <img
                                                src={`${BASE_URL}${dish.food_image}`}
                                                className="h-full w-full rounded-lg object-cover"
                                                alt={dish.food_name}
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-100">
                                                {dish.food_name}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-300">{dish.food_category_obj}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-300">{dish.time_taken} Min</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                                        {dish.price}
                                    </span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            dish.is_available
                                                ? "bg-green-800 text-green-100"
                                                : "bg-red-800 text-red-100"
                                        }`}
                                    >
                                        {dish.is_available ? "Available" : "Unavailable"}
                                    </span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                    <button
                                        onClick={() => handleEdit(dish.id)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(dish.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default DishesTable;
