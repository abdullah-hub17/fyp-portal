import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../coordinator/CoordinatorSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import Loader from "../Loader";

import { FaTh, FaBars } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { LuPanelLeftOpen } from "react-icons/lu";
import { MdOutlineAnnouncement, MdSubdirectoryArrowRight } from "react-icons/md";
import { RiSubtractFill } from "react-icons/ri";
import { SiInstructure } from "react-icons/si";
import { HiLogout } from "react-icons/hi";

const SidebarItem = ({ item, isOpen }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const handleMainMenuItemClick = () => {
    navigate(item.path);
  };

  const renderSubMenu = (subMenuItems) => {
    return (
      <ul className="submenu">
        {isSubMenuOpen && (
        <div className="submenu-indicator">
          <MdSubdirectoryArrowRight />
        </div>
      )}
        {subMenuItems.map((subItem, index) => (
          <NavLink
            to={subItem.path}
            key={index}
            className="coordinator_link_sub"
            activeClassName="active"
          >
            <div className="subIcon-bar"><RiSubtractFill /></div>
            <div className="coordinator_link_text">{subItem.name}</div>
          </NavLink>
        ))}
      </ul>
    );
  };

  return (
    <li key={item.id}>
      <div
        className="coordinator_link"
        onClick={item.subMenu ? handleToggleSubMenu : handleMainMenuItemClick}
        activeClassName="active"
      >
        <div className="co_icon">{item.icon}</div>
        <div
          className="coordinator_link_text"
          style={{ display: isOpen ? "block" : "none" }}
        >
          {item.name}
        </div>
      </div>
      {isSubMenuOpen && item.subMenu && renderSubMenu(item.subMenu)}
    </li>
  );
};

const CoordinatorSidebar = ({ children }) => {
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
      path: "/coordinatorDashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/registerSupervisor",
      name: "Reg Supervisor",
      icon: <FiUserPlus />,
    },
    {
      path: "/supervisorList",
      name: "Supervisors List",
      icon: <FiUserPlus />,
    },
    {
      path: "/studentList",
      name: "Students List",
      icon: <FiUserPlus />,
    },
    {
      name: "Exams",
      icon: <SiInstructure />,
      subMenu: [
        {
          path: "/Exams/CreateExamType",
          name: "Create Exam Type",
        },
        {
          path: "/Exams/CreateExam",
          name: "Create Exam",
        },
        {
          path: "/Exams/ScheduleExam",
          name: "Schedule Exam",
        },
        {
          path: "/Exams/CreateExamQues",
          name: "Create Exam Ques",
        },
        {
          path: "/Exams/AssignExam",
          name: "Assign",
        },
      ],
    },
    {
      name: "CLOs",
      icon: <LuPanelLeftOpen />,
      subMenu: [
        {
          path: "/CLOs/CreateClo",
          name: "Create CLO",
        }, 
        // {
        //   path: "/CLOs/ManageClo",
        //   name: "Manage CLO",
        // },
      ],
    },
    {
      path: "/Panels",
      name: "Panels",
      icon: <LuPanelLeftOpen />,
    },
    {
      path: "/manageAnnouncement",
      name: "Announcement",
      icon: <MdOutlineAnnouncement />,
    },
    // {
    //   path: "/Manageclo",
    //   name: "Manage CLO",
    //   icon: <SiInstructure />,
    // },
    // {
    //   path: "/Manageplo",
    //   name: "Manage PLO",
    //   icon: <SiInstructure />,
    // },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className={`coordinator_container_sidebar ${
              isOpen ? "open" : "closed"
            }`}
          >
            <div
              style={{ width: isOpen ? "280px" : "55px" }}
              className="sidebar"
            >
              <div className="coordinator_top_section">
                <h1
                  className="coordinator_logo"
                  style={{ display: isOpen ? "block" : "none" }}
                >
                  Coordinator
                </h1>
                <div
                  style={{ marginLeft: isOpen ? "0px" : "-1.8px" }}
                  className="coordinator_bars"
                  activeclassName="barsActive"
                >
                  <FaBars onClick={toggle} />
                </div>
              </div>
              <ul className="menu-items">
                {menuItem.map((item, index) => (
                  <SidebarItem
                    key={index}
                    item={item}
                    isOpen={isOpen}
                  />
                ))}
              </ul>
              <button
                className="coordinator_logout_button"
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

export default CoordinatorSidebar;
