import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../student/Studentsidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import Loader from "../Loader";
import { FaTh, FaBars, FaThList, FaUser, FaRegChartBar,FaCheckCircle , FaComments } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";

const StudentSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.AUTH);

  
  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/registration",
      name: "Registration",
      icon: <FaUser />,
    },
    {
      path: "/supervisor",
      name: "Supervisorlist",
      icon: <FaThList />,
    },
    {
      path: "/fyp1",
      name: "Fyp1",
      icon: <FaRegChartBar />,
    },
    {
      path: "/fyp2",
      name: "Fyp2",
      icon: <FaRegChartBar />,
    },
    {
      path: "/fyp3",
      name: "Fyp3",
      icon: <FaRegChartBar />,
    },
    {
      path: "/status",
      name: "Status",
      icon: <FaCheckCircle />,
    },
    {
      path: "/feedback",
      name: "Feedback",
      icon: <FaComments />,
    },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="student_container_sidebar">
            <div
              style={{ width: isOpen ? "200px" : "55px" }}
              className="sidebar"
            >
              <div className="student_top_section">
                <h1
                  style={{ display: isOpen ? "block" : "none" }}
                  className="student_logo"
                >
                  Student
                </h1>
                <div
                  style={{ marginLeft: isOpen ? "30px" : "-1.8px" }}
                  className="student_bars"
                  activeclassName="barsActive"
                >
                  <FaBars onClick={toggle} />
                </div>
              </div>
              {menuItem.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className="student_link"
                  activeclassName="active"
                >
                  <div className="icon">{item.icon}</div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className="student_link_text"
                  >
                    {item.name}
                  </div>
                </NavLink>
              ))}

              <button
                className="student_logout_button"
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

export default StudentSidebar;