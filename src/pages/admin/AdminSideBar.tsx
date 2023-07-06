import React from "react"
import { Divider, Drawer, List, ListItem, ListItemButton } from "@mui/material";
import { BiFoodMenu, BiUser } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
    return(
        <React.Fragment>
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
            <Divider />
            <List>
                <ListItem key={"menu"} disablePadding>
                <NavLink
                    to={"/admin"}
                    className={(isActive) =>
                    isActive.isActive
                        ? "font-bold bg-orange-100 ml-2 w-48 m-1"
                        : "text-black font-bold ml-2 w-48 m-1"
                    }
                >
                    <ListItemButton className="jp">
                    <p className="mr-3">
                        <BiFoodMenu />
                    </p>
                    リクエスト管理
                    </ListItemButton>
                </NavLink>
                </ListItem>
                <ListItem key={"coupon"} disablePadding>
                <NavLink
                    to={"/manage-coupon"}
                    className={(isActive) => {
                    console.log(isActive);
                    return isActive.isActive
                        ? "font-bold bg-orange-100 ml-2 w-48 m-1"
                        : "text-black font-bold ml-2 w-48 bg-white m-1";
                    }}
                >
                    <ListItemButton className="jp">
                    <p className="mr-3">
                        <BiUser />
                    </p>
                    ユーザ管理
                    </ListItemButton>
                </NavLink>
                </ListItem>
            </List>
            </Drawer>
        </React.Fragment>
    )
}

export default AdminSideBar;
