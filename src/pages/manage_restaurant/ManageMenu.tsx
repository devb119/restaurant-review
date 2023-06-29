import Sidebar from './Sidebar'
import MenuTable from './MenuTable'

function ManageMenu() {
  return (
    <div className="flex">
      <div>
        <Sidebar></Sidebar>
      </div>
      <div className='-mt-20'>
        <MenuTable></MenuTable>
      </div>
    </div>
  );
}

export default ManageMenu