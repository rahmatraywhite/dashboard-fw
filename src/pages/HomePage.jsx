import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Homepage = () => {
  return (
    <div className=''>
      <Sidebar />
       <div className='flex gap-2 items-center mx-auto'>
       <Link to='/matakuliah' className="bg-[#1B9AD7] text-white py-3 px-4 rounded-md hover:bg-blue-600 cursor-pointer">
            Add Mata Kuliah
        </Link>
        <Link to='/dosen' className="bg-[#1B9AD7] text-white py-3 px-4 rounded-md hover:bg-blue-600 cursor-pointer">
            Add Data Dosen
        </Link>
        <Link to='/mahasiswa' className="bg-[#1B9AD7] text-white py-3 px-4 rounded-md hover:bg-blue-600 cursor-pointer">
            Add Data Mahasiswa
        </Link>
       </div>
    </div>
  )
}

export default Homepage