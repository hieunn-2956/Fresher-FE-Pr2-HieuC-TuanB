import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../actions";
import useAvatar from "../../assets/images/userAvatar.jpg";
import { useTranslation } from "react-i18next";

import "./style.scss";

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <nav className='sidebar'>
      <div className='sidebar-container'>
        <h1 className='brand'>
          Travling<span>Dashboard</span>
        </h1>
        <ul>
          <li>
            <NavLink to={"/"}>{t("Home")}</NavLink>
          </li>
          <li>
            <NavLink to={"/products"}>{t("Product")}</NavLink>
          </li>
          <li>
            <NavLink to={"/order"}>{t("Order")}</NavLink>
          </li>
        </ul>
        <div className='sidebar-footer'>
          <h3>{t("Profile")}</h3>
          <div className='account'>
            <div className='account-img'>
              <img src={user.profilePicture || useAvatar} alt='avatar' />
            </div>
            <h4 className='account-name'>Hieu</h4>
          </div>
          <button className='signout-button' onClick={() => dispatch(logOut())}>
            {t("Signout")}
          </button>
        </div>
      </div>
    </nav>
  );
}
