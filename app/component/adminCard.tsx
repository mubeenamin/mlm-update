import React from 'react'

interface Props {
    title: string
    value: number
    
}

const AdminCard = ({ title, value } : Props) => {
  return (
   
    <div className="bg-orange-500 shadow-md rounded-lg p-6 m-4 w-full md:w-1/3">
    <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
    <p className="text-3xl font-bold text-gray-900 mt-4">{value}</p>
  </div>
 
 
  )
}

export default AdminCard




