import { Divider, Drawer, List, ListItem, ListItemButton } from "@mui/material";
import { BiFoodMenu } from "react-icons/bi";
import { RiCoupon2Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
function Sidebar() {
  return (
    <Drawer
      sx={{
        width: 210,
        marginTop: 24,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          marginTop: 10,
          width: 210,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* <Toolbar /> */}
      <Divider />
      <List>
        <ListItem key={"menu"} disablePadding>
          <NavLink
            to={"/manage-menu"}
            className={(isActive) =>
              isActive
                ? "font-bold bg-orange-100 ml-2 w-48 m-1"
                : "text-black font-bold ml-2 w-48 m-1"
            }
          >
            <ListItemButton>
              <p className="mr-3">
                <BiFoodMenu />
              </p>
              メニュー管理
            </ListItemButton>
          </NavLink>
        </ListItem>
        <ListItem key={"coupon"} disablePadding>
          <NavLink
            to={"/manage-coupon"}
            className={(isActive) =>
              isActive
                ? "font-bold bg-orange-100 ml-2 w-48 m-1"
                : "text-black font-bold ml-2 w-48　bg-white m-1"
            }
          >
            <ListItemButton>
              <p className="mr-3">
                <RiCoupon2Line />
              </p>
              クーポン管理
            </ListItemButton>
          </NavLink>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
