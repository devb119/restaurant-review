import * as React from "react";
import {
  Tooltip,
  Divider,
  ListItemIcon,
  MenuItem,
  Menu,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FiLogOut } from "react-icons/fi";
import { BiRestaurant } from "react-icons/bi";
import { setCurrentUser } from "../redux/user.reducer";
import { Logout } from "../services/auth/Auth";
import { UserRole } from "../models/enum";
import { useNavigate } from "react-router-dom";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const logout = Logout();
    Promise.all([logout]).then(() => {
      setAnchorEl(null);
      dispatch(setCurrentUser(null));
      navigate("/", { replace: true });
    });
  };

  const navigateToManage = () => {
    navigate("/manage-menu");
  };
  
  const navigateToAdmin = () => {
    navigate("/admin")
  }
  const user = useSelector((state: RootState) => state.user.user);
  // console.log(user);
  const isOwner = user?.role === UserRole.RestaurantManager;
  const isAdmin = user?.role === UserRole.Admin;

  return (
    <React.Fragment>
      <div className="flex items-center text-center">
        <Tooltip title="Account settings">
          <div
            onClick={handleClick}
            className="cursor-pointer flex items-center gap-2 rounded-full py-2 px-4 hover:bg-main hover:text-white transition-all"
          >
            <p>{user?.username}</p>
            <div className="w-9 h-9 rounded-full">
              <img className="w-full" src={user?.image} />
            </div>
          </div>
        </Tooltip>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> <p className="w-32">プロファイル</p>
        </MenuItem>
        {isOwner && (
          <MenuItem onClick={navigateToManage}>
            <ListItemIcon>
              <BiRestaurant className="text-xl" />{" "}
            </ListItemIcon>
            <p className="w-32">私のレストラン</p>
          </MenuItem>
        )}
        {isAdmin && (
          <MenuItem onClick={navigateToAdmin}>
            <ListItemIcon>
              <BiRestaurant className="text-xl" />{" "}
            </ListItemIcon>
            <p className="w-32">管理ページ</p>
          </MenuItem>
        )}

        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <p className="text-xl">
              <FiLogOut />
            </p>
          </ListItemIcon>
          <p className="w-32">ログアウト</p>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
