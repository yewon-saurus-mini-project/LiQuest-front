import { useState, useEffect } from "react";
import axios from "axios";
import UserProfileView from "./UserProfileView";

function UserProfile2({ userId, token, profiles, setProfiles }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const userProfile = (userId) => {
      if (profiles[userId]) {
        setProfile(profiles[userId]);
      } else {
        axios
          .get(import.meta.env.VITE_API_URL + `/accounts/profile/${userId}/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          .then((response) => {
            if (response.data) {
              setProfiles((prevProfiles) => ({
                ...prevProfiles,
                [userId]: response.data,
              }));
              setProfile(response.data);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    userProfile(userId);
  }, [userId, token, profiles, setProfiles]);

  return <UserProfileView profile={profile} />;
}

export default UserProfile2;
