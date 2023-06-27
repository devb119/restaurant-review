import React from 'react'
import Sidebar from './Sidebar'
import MenuTable from './MenuTable'

function ManageMenu() {
  return (
    
    <div className='flex'><div>
      <Sidebar></Sidebar></div>


      <MenuTable></MenuTable>
    </div>
  )
}

export default ManageMenu