import React from "react";
import { FaBell, FaHeadphones, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

import "./style.scss";

export default function Header() {
  const auth = useSelector((state) => state.auth);

  if (!auth.token) {
    return null;
  }

  return (
    <header>
      <div className='header-welcome'>
        <h2>
          WELCOME, <span>{auth.user.lastName}</span>
        </h2>
        <p>See what news today</p>
      </div>
      <div className='header-menu'>
        <div className='header-search'>
          <FaSearch />
          <input type='text' placeholder='Search a transaction' />
          <button>Enter</button>
        </div>
        <FaBell />
        <FaHeadphones />
      </div>
    </header>
  );
}
