import React from 'react'
import AddNewInterview from './_components/AddNewInterview';

const DashboardPage = () => {
  return (
    <div className='p-10'>
        <h2 className='font-bold text-2xl '>Dash board</h2>
        <h2 className='text-gray-500'>Create and start your mockup interview.</h2>

        <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
          <AddNewInterview/>
        </div>

    </div>
  )
}

export default DashboardPage;