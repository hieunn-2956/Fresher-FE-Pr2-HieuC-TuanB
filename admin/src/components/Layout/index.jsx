import React from "react";
import Header from "../Header";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../actions";

import "./style.scss";

export default function Layout(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container>
          <div className='layout-container'>
            <nav className='sidebar'>
              <div className='sidebar-container'>
                <h1 className='brand'>
                  Travling<span>Dashboard</span>
                </h1>
                <ul>
                  <li>
                    <NavLink to={"/"}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/products"}>Product</NavLink>
                  </li>
                </ul>
                <div className='sidebar-footer'>
                  <h3>Profile</h3>
                  <div className='account'>
                    <div className='account-img'>
                      <img
                        src='https://source.unsplash.com/collection/happy-people'
                        alt='avatar'
                      />
                    </div>
                    <h4 className='account-name'>Hieu</h4>
                  </div>
                  <button
                    className='signout-button'
                    onClick={() => dispatch(logOut())}
                  >
                    Signout
                  </button>
                </div>
              </div>
            </nav>
            <div className='content'>{props.children}</div>
          </div>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
}
