import React, { useState, useEffect } from 'react';
import '../coordinatorstylings/CoordinatorDashboard.css';

const CoordinatorDashboard = () => {
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
      <div className='header_notification'>
        <h1>Notification</h1>
      </div>
      <div className="notifications-container">
        {notifications.map((notification, index) => (
          <div key={index} className="notification">
            <span>{notification}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
