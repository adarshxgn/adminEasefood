import { motion } from 'motion/react'
import React, { useEffect, useState } from 'react'
import Addtables from './Addtables';
import { getTableApi } from '../../services/allApi';
import { p, table } from 'motion/react-client';
const Tables = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tables, setTables] = useState([])

const getalltables = async()=>{
    try{
        const result = await getTableApi()
        setTables(result.data)
        console.log(result);
    }catch(err){
        console.log(err);
        
    }

    useEffect(()=>{
        getalltables()
    },[])
    
}

  const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
    };
  return (
     <motion.div className=" mb-6" style={{minHeight:"60vh"}}>
        <div className='grid grid-cols-1 gap-5 lg:grid-cols-3   '>
                    <div>
                         <button
                             className="text-lg rounded-lg bg-blue-700 hover:bg-blue-800 text-blue-100 m-5 p-1"
                             onClick={openModal}
                         >
                             Add Tables
                         </button> 
                    </div> 
                       {
                        tables.length>0 ? tables.map((table,index)=>(
                            <div className="table-container">
            {/* Top Chair */}
            <div className="chair top-chair"></div>

            {/* Table */}
            <button className="table-btn" variant="primary">
            {table.table_number}
            </button>
    
            {/* Bottom Chair */}
            <div className="chair bottom-chair"></div>
    
            {/* Left Chair */}
            <div className="chair left-chair"></div>
    
            {/* Right Chair */}
            <div className="chair right-chair"></div>
          </div> 
                        )):
                        <p>No tables added</p>
                       }
                 </div>
                 {isModalOpen && <Addtables onClose={closeModal} />} 
     </motion.div>
)
}
export default Tables