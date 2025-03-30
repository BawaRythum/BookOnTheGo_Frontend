import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { unsubscribeFromUpdates } from "./notificationApi"; 

function UnsubscribePage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email"); 

  useEffect(() => {
    const token = localStorage.getItem("token"); 

    if (email && token) {
      unsubscribeFromUpdates(email, token)
        .then(() => {
          alert("You have been unsubscribed successfully.");
        })
        .catch((error) => {
          console.error("Failed to unsubscribe:", error);
          alert("There was an issue unsubscribing. Please try again.");
        });
    }
  }, [email]);

  return (
    <div>
      <h1>Unsubscribe</h1>
      <p>If you were successfully unsubscribed, you will no longer receive event notifications.</p>
    </div>
  );
}

export default UnsubscribePage;
