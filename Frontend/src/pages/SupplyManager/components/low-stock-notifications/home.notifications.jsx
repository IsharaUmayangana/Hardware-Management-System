import { useEffect, useState } from "react"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import styles from "./notifications.module.css"



const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [selectedNotifications, setSelectedNotifications] = useState([]);



    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await fetch('http://localhost:8000/supply-management/notifications');

            if (response.ok) {
                const json = await response.json();
                setNotifications(json);
            } else {
                console.error('Failed to fetch data');
            }
        };

        fetchNotifications()
    },[])

    
    
    //console.log("notifications ", notifications)

    const handleNotificationSelection = (notificationId) => {
        setSelectedNotifications((prevSelectedNotifications) =>
            prevSelectedNotifications.includes(notificationId)
                ? prevSelectedNotifications.filter((id) => id !== notificationId)
                : [...prevSelectedNotifications, notificationId]
        );
    };

    const handlePlaceIndividualOrders = () => {
        // Logic to place individual orders for selected notifications
        console.log("Placing individual orders for:", selectedNotifications);
    };

    const handleConsolidateOrders = () => {
        // Logic to consolidate selected notifications into orders
        console.log("Consolidating orders for:", selectedNotifications);
    };

    return (
        <div className={styles.lowStockNotificationsContainer}>

            {notifications.map((notification) => (
                <div key={notification._id} className={styles.notificationItem}>
                    <input
                        type="checkbox"
                        checked={selectedNotifications.includes(notification._id)}
                        onChange={() => handleNotificationSelection(notification._id)}
                    />
                    <div className={styles.notificationContent}>
                        <h4>{notification.name}</h4>
                        <p><strong>Category:</strong> {notification.category}</p>
                        <p>{notification.quantity} items remaining</p>
                        <p>{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}</p>
                        <p><strong>Suppliers:</strong> {notification.suppliers?.map(supplier => supplier.name).join(', ')}</p>
                    </div>
                </div>
            ))}
            <div className={styles.notificationButtons}>
                <button onClick={handlePlaceIndividualOrders}>Place Individual Orders</button>
                <button onClick={handleConsolidateOrders}>Consolidate Orders</button>
            </div>
        </div>
    )
}

export default NotificationPage