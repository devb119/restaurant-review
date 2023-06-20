import React from "react";
import { IUserModel } from "../models";
import { UserState, setCurrentUser } from "../redux/user.reducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getUserByEmail } from "../services/auth/Auth";

export function useAuth(): IUserModel | null {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.user.user);
    
    React.useEffect(() => {
        const authUser = JSON.parse(`${localStorage.getItem('user')}`);
    
        if(!authUser) {
            dispatch(setCurrentUser(null));
        }
        else {
          const userData = getUserByEmail(authUser.email);
          Promise.all([userData]).then((user) => {
            console.log(user);
            if(user) {
              dispatch(setCurrentUser(user[0]));
            }
            else {
                dispatch(setCurrentUser(null));
                localStorage.removeItem('user');
            }
          })
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    return currentUser;
}