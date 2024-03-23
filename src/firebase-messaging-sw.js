
import { getMessaging, getToken } from "firebase/messaging";

const messaging = getMessaging();

getToken(messaging, { vapidKey: "BHK_CVTsqZVzHaikbh99JiCP6tPETEIXJw-XS3whKBB8fYSDLE4vVpW_yjakJoDAT_j6QG6wT2wLCm1gmAmNhdA" })
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server
      // Update UI if necessary
      console.log("Token received:", currentToken);
    } else {
      // Show permission request UI
      console.log("No registration token available. Request permission to generate one.");
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
  });
