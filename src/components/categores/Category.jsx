import { motion } from 'motion/react'
import React, { useEffect, useState } from 'react'
import { getCategoryApi } from '../../services/allApi'
import { BASE_URL } from '../../services/baseUrl'

const Category = () => {
  const [viewCatergory,setViewCategory] = useState([])


  const fetchCategory = async ()=>{
    try{
      const response = await getCategoryApi();
      setViewCategory(response.data)
      console.log(response.data);
    }
    catch(err){
      console.log("error fetching category",err);
    }
  }
  useEffect(()=>{
    fetchCategory();
  },[])

  return (
    <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
          <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
          <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Category image
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Category name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Action    
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {viewCatergory.map((cat)=>(

                     
                    <motion.tr
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                   <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                    <div className="flex-shrink-0 h-20 w-20">
                        <img
                         src={`${BASE_URL}${cat.category_image}`}
                          className="h-full w-full rounded-lg object-cover"
                          alt=''
                         />
                      </div>
                      <div className="ml-4">
                       <div className="text-sm font-medium text-gray-100">
                                  </div>
                         </div>
                         </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-300">
                                    {cat.food_category_name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap space-x-2 flex">
                                   <div>
                                        <button
        
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </button>
                                   </div>
                                    <div>
                                        <button
                                            
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                      </motion.tr>
                       ))}
                      </tbody>
            </table>
            </div>

    </motion.div>
  )
}

export default Category