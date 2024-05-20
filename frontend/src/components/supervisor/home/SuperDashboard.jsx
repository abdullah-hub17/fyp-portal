import React, { useState, useEffect } from 'react';
import '../superstylings/SuperDashboard.css';

const SuperDashboard = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const newNotifications = [
      'Your next FYP defense is on 19 December',
      'Don\'t forget to submit your final report',
      'Meeting with your advisor at 2 PM',
      'Important deadline approaching'
    ];

    setNotifications(newNotifications);

    return () => {
      setNotifications([]);
    };
  }, []);

  return (
    
    <div>
      
      {/* <h1>superDashboard</h1> */}
      <div className='super_header_notification'>
        <h1>Notification</h1>
      </div>
      <div className="super_notifications-container">
        {notifications.map((notification, index) => (
          <div key={index} className="super_notification">
            <span>{notification}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperDashboard;
