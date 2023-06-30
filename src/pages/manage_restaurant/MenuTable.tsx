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
import { FaStar } from "react-icons/fa";
import { NavigateFunction, useNavigate } from "react-router-dom";
interface Data {
  id?: string;
  name: JSX.Element;
  image: JSX.Element;
  price: string;
  rating: JSX.Element;
  description: string;
  action?: JSX.Element;
}

const DeleteEditAction = ({ food_id }: { food_id: string }) => {
  const dispatch = useDispatch();

  const showDeleteMenuDialog = () => {
    dispatch(
      setDialog({
        open: true,
        title: "削除確認",
        text: "この料理を削除しています。本気ですか？",
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
        title: "変更確認",
        text: "これらの変更を保存しますか?",
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

function useCreateData(food: Food, navigate: NavigateFunction): Data {
  return {
    id: food.id,
    name: (
      <p
        className=" font-montserrat font-semibold cursor-pointer"
        onClick={() => {
          navigate(`./food/${food.id}`);
        }}
      >
        {food.name}
      </p>
    ),
    image: <img src={food.image} className="w-32 h-32"></img>,
    price: food.price,
    rating: (
      <span className=" font-montserrat font-normal text-sm px-1 flex items-center">
        {food.rating} <FaStar className="text-yellow-500 ml-1 -mt-1"></FaStar>
      </span>
    ),
    description: food.description,
    action: <DeleteEditAction food_id={food.id || ""}></DeleteEditAction>,
  };
}

const mapFoodDataToRowData = (foods: Food[], navigate: NavigateFunction): Data[] => {
  return foods.map((food: Food) => {
    return useCreateData(food, navigate);
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

export interface IMenuTableProps {
  restaurantId: string;
}

export default function MenuTable(props: IMenuTableProps) {
  const { restaurantId } = props;
  const [foods, setFoods] = React.useState<Food[]>([]);
  const [display, setDisplay] = React.useState<Food[]>([]);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("rating");
  const [selected, setSelected] = React.useState<Food[]>([]);
  const [openCreateFood, setOpenCreateFood] = React.useState<boolean>(false);
  const searchKey = "name";
  const [searchText, setSearchText] = React.useState<string>("");
  React.useEffect(() => {
    getFoodsByRestaurantId(restaurantId).then((res) => setFoods(res as Food[]));
  }, [restaurantId]);
  // const rows = React.useMemo(() => mapFoodDataToRowData(foods, navigate), [foods, navigate]);

  // const [visibleRows, setVisibleRows] = React.useState<Data[]>([]);

  React.useEffect(() => {
    setDisplay(
      foods.filter((food) => {
        return food[searchKey]
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase());
      })
    );
  }, [searchText, foods]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = foods;
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const AddFoodButton = () => {
    const [newFood, setNewFood] = React.useState<Food>();

    const addNewFood = () => {
      return;
    };
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
          handleClickYes={() => addNewFood()}
          popupContent={<AddFood />}
        ></Popup>
      </>
    );
  };
  const toolbarItems = (
    <div className="flex m-4 justify-between">
      <div className="w-3/4 ">
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
        ></SearchBar>
      </div>
      <div className="w-1/4 flex justify-end">
        <AddFoodButton></AddFoodButton>
      </div>
    </div>
  );

  return (
    <TablePager<Food>
      tableTitle={"メニュー管理"}
      selected={selected}
      orderBy={orderBy}
      onSelectAllClick={handleSelectAllClick}
      total={foods.length}
      data={display}
      mapDataToRowData ={mapFoodDataToRowData}
      headCells={headCells}
      showSearchBar={true}
      toolbarItems={toolbarItems}
    ></TablePager>
  );
}
