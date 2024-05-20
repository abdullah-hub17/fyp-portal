import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "../supervisor/SuperSidebar.css";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/actions/authAction";
import Loader from "../Loader";

import { FaTh, FaBars } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { SiMinutemailer } from "react-icons/si";
import { HiLogout } from "react-icons/hi";
import {FaComments } from "react-icons/fa";

const SuperSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.AUTH);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItem = [
    {
      path: "/superdashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/fyprequests",
      name: "FypRequests",
      icon: <FiUsers />,
    },
    {
      path: "/emailcoordinator",
      name: "EmailCoordinator",
      icon: <SiMinutemailer />,
    },
    {
      path: "/supervisorfeedback",
      name: "Feedback",
      icon: <FaComments  />,
    },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="super_container_sidebar">
            <div
              style={{ width: isOpen ? "200px" : "55px" }}
              className="super_sidebar"
            >
              <div className="super_top_section">
                <h1
                  style={{ display: isOpen ? "block" : "none" }}
                  className="super_logo"
                >
                  Supervisor
                </h1>
                <div
                  style={{ marginLeft: isOpen ? "30px" : "-1.8px" }}
                  className="super_bars"
                  activeclassName="barsActive"
                >
                  <FaBars onClick={toggle} />
                </div>
              </div>
              {menuItem.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className="super_link"
                  activeclassName="active"
                >
                  <div className="super_icon">{item.icon}</div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="super_link_text"
                  >
                    {item.name}
                  </div>
                </NavLink>
              ))}

              <button
                className="super_logout_button"
                onClick={handleLogout}
                type="submit"
              >
                <HiLogout />
              </button>
            </div>

            <main>{children}</main>
          </div>
        </>
      )}
    </>
  );
};

export default SuperSidebar;
