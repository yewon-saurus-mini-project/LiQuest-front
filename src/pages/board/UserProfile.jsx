import { useState, useEffect } from "react";
import axios from "axios";
import UserProfileView from "./UserProfileView";

function UserProfile({ userId, token }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/accounts/profile/${userId}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        );

        if (response.data) {
          setProfile(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [userId, token]);

  return <UserProfileView profile={profile} />;
}

export default UserProfile;
