import React, { useState, useEffect } from 'react';
import '../studentstylings/StudentDashboard.css';

const StudentDashboard = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate multiple notifications
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
      
      {/* <h1>Dashboard</h1> */}
      <div className='header_notification_ST'>
        <h1>Notification</h1>
      </div>
      <div className="notifications-container_ST">
        {notifications.map((notification, index) => (
          <div key={index} className="notification_ST">
            <span>{notification}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
