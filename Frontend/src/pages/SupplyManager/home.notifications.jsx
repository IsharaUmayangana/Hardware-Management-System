import { useEffect, useState } from "react";
import "./index.css";
import { useNotificationContext } from "../../hooks/useNotificationContext";

// components
import Notifications from "./components/Notifications";

const NotificationPage = () => {
  const { notifications, dispatch } = useNotificationContext();

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch(
        "http://localhost:8000/supply-management/notifications"
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_NOTIFICATIONS", payload: json });
      }
    };

    fetchNotifications();
  }, [dispatch]);

  return (
    <div className="notification-page">
      <div className="notifications-container">
        {/*<h2 className="notifications-heading">Out of Stock Items</h2>*/}
        <div className="notifications-list">
          {notifications &&
            notifications.map((notification) => (
              <Notifications
                notification={notification}
                key={notification._id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
