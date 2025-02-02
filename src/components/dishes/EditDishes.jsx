import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { addFoodListApi, editFoodListApi } from "../../services/allApi";
import { editResponceContext } from "../../pages/context/ContextShare";
import { useContext } from "react"; 
const EditDishes = ({ onClose, dish }) => {
    const[imageFileStatus,setImageFileStatus] = useState(false)
    const [preview,setPreview] = useState('')
    const{editResponce, setEditResponce} =useContext(editResponceContext)
    const [formData, setFormData] = useState({
        food_name: dish?.food_name,
        description:dish?.description,
        food_category_obj:dish?.food_category_obj,
        price: dish?.price,
        food_image:dish?.food_image ,
        time_taken:dish?.time_taken ,
        is_available: true,
    });
    useEffect(()=>{
            if(formData.food_image.type=="image/png" || formData.food_image.type=="image/jpg" || formData.food_image.type=="image/jpeg" ){
              setImageFileStatus(true)
              setPreview(URL.createObjectURL(formData.food_image))
            }else{
              setImageFileStatus(false)
              setPreview('')
              setFormData({...formData,food_image:""})
            }
          },[formData.food_image])

 const owner = localStorage.getItem("owner")
    const handleSubmit = async (e) => {
        e.preventDefault();
        const{food_name,description,food_category_obj,price,food_image,time_taken,is_available}=formData
        if(food_name && description && food_category_obj && price && food_image && time_taken && is_available&&owner){
            const editDish = new FormData()
            editDish.append('food_name',food_name)
            editDish.append('description',description)
            editDish.append('food_category_obj',food_category_obj)
            editDish.append('price',price)
            editDish.append('food_image',food_image)
            editDish.append('time_taken',time_taken)
            editDish.append('is_available',is_available)
            editDish.append('owner',owner)
            
            const token = localStorage.getItem("accessToken")   
            if(token){
                const reqHeader = {
                  "Content-Type":"multipart/form-data",
                  "Authorization":`Bearer ${token}`
                }
                try{
                    const result = await editFoodListApi(editDish,reqHeader)
                    console.log(result);
                    if(result.status==200){
                        onclose()
                        setEditResponce(result)
                    }else{
                        alert(result.response.data)
                    }
                    
                }catch(err){
                    console.log(err.response);
                    
                }
            }
        }

        onClose(); // Close the modal after submission
    };

    return (
        <motion.div
            className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center h-[30rem]"
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
                            onChange={e=>setFormData({...formData,food_name:e.target.value})}
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
                            name="food_name"
                            value={formData.description}
                            onChange={e=>setFormData({...formData,description:e.target.value})}
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
                            onChange={e=>setFormData({...formData,food_category_obj:e.target.value})}
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
                            onChange={e=>setFormData({...formData,price:e.target.value})}
                            className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Food image
                        </label>
                        <input
                            type="file"
                            name="food_image"
                            onChange={e=>setFormData({...formData,food_image:e.target.files[0]})}
                            className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                           Time taken
                        </label>
                        <input
                            type="number"
                            name="time taken"
                            value={formData.time_taken}
                            onChange={e=>setFormData({...formData,time_taken:e.target.value})}
                            className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
                            onChange={e=>setFormData({...formData,is_available:e.target.checked})}
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
                            Add Dish
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default EditDishes;
