import * as React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Food from "../../models/foods";
import { useDispatch } from "react-redux";
import { setDialog } from "../../redux/dialog.reducer";
import { getFoodsByRestaurantId } from "../../services/FoodApi";
import { Popup, SearchBar, TablePager } from "../../components/common";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { LuEdit } from "react-icons/lu";
import AddFood from "./AddFood";
interface Data {
  id?: string;
  name: string;
  image: JSX.Element;
  price: string;
  rating: number;
  description: string;
  action?: JSX.Element;
}

const DeleteEditAction = ({ food_id }: { food_id: string }) => {
  const dispatch = useDispatch();

  const showDeleteMenuDialog = () => {
    dispatch(
      setDialog({
        open: true,
        title: "Confirm delete",
        text: "If you delete thislskjdfks",
        handleClickYes: () => {
          deleteFood(food_id);
        },
      })
    );
  };

  const showEditMenuPopUp = () => {
    dispatch(
      setDialog({
        open: true,
        title: "Confirm delete",
        text: "If you edit thislskjdfks",
        handleClickYes: () => {
          deleteFood(food_id);
        },
      })
    );
  };

  const deleteFood = (food_id: string) => {
    console.log(food_id);
  };
  return (
    <div className="flex items-center">
      <button
        className="text-blue-800 p-2"
        onClick={() => {
          showEditMenuPopUp();
        }}
      >
        <LuEdit className="text-base"></LuEdit>
      </button>
      <button
        className="text-main p-2"
        onClick={() => {
          showDeleteMenuDialog();
        }}
      >
        <AiOutlineDelete className="text-xl"></AiOutlineDelete>
      </button>
    </div>
  );
};

function createData(food: Food): Data {
  return {
    id: food.id,
    name: food.name,
    image: <img src={food.image} className="w-32 h-32"></img>,
    price: food.price,
    rating: food.rating,
    description: food.description,
    action: <DeleteEditAction food_id={food.id || ""}></DeleteEditAction>,
  };
}

const mapFoodDataToRowData = (foods: Food[]): Data[] => {
  return foods.map((food: Food) => {
    return createData(food);
  });
};

type Order = "asc" | "desc";
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "料理",
  },
  {
    id: "image",
    numeric: false,
    disablePadding: false,
    label: "写真",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "値段",
  },
  {
    id: "rating",
    numeric: true,
    disablePadding: false,
    label: "平均評価",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "説明",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "高度",
  },
];

export default function EnhancedTable() {
  const [foods, setFoods] = React.useState<Food[]>([]);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("rating");
  const [selected, setSelected] = React.useState<Data[]>([]);
 const [openCreateFood, setOpenCreateFood] = React.useState<boolean>(false)
  React.useEffect(() => {
    getFoodsByRestaurantId("U0JWRsWq2wAn4xmaOV8y").then((res) =>
      setFoods(res as Food[])
    );
  }, []);
  const rows = React.useMemo(() => mapFoodDataToRowData(foods), [foods]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows;
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const AddFoodButton = () => {
    const [newFood, setNewFood] = React.useState<Food>()
    
    const addNewFood=()=>{
      return;
    }
    return (
      <>
        <button
          onClick={() => {
            setOpenCreateFood(true);
          }}
          className="bg-main p-2 px-4 cursor-pointer rounded-2xl text-white font-bold flex items-center"
        >
          <MdOutlineAddCircleOutline className="text-white text-2xl fill-white mx-2 "></MdOutlineAddCircleOutline>
          作成
        </button>
        <Popup
          title="料理を追加"
          open={openCreateFood}
          setOpen={setOpenCreateFood}
          handleClickYes={ () => addNewFood() }
          popupContent={<AddFood/>}
        ></Popup>
      </>
    );
  };
  const toolbarItems = (
    <div className="flex m-4 justify-between">
      <div className="w-3/4 ">
        <SearchBar></SearchBar>
      </div>
      <div className="w-1/4 flex justify-end">
        <AddFoodButton></AddFoodButton>
       
      </div>
    </div>
  );

  return (
    <TablePager<Data>
      tableTitle={"メニュー管理"}
      selected={selected}
      order={order}
      orderBy={orderBy}
      onSelectAllClick={handleSelectAllClick}
      onRequestSort={handleRequestSort}
      rowCount={rows.length}
      rowData={rows}
      headCells={headCells}
      showSearchBar={true}
      searchKey="name"
      toolbarItems={toolbarItems}
    ></TablePager>
  );
}
