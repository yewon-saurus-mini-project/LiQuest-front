import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Input } from "../../../components";
import MyPageNav from "./MyPageNav";

function Profile() {
  const [userData, setUserData] = useState(null);
  const token = sessionStorage.getItem("aivle19_token");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/accounts/profile/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        if (response.data) setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  return (
    <>
      <MyPageNav />
      <div
        className="pt-[63px] min-h-screen"
        style={{
          padding: "63px",
          marginLeft: "256px",
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Card className="py-2 w-[300px] h-fit">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">
              Level.{" "}
              {userData !== null ? userData.profile.user_level : "Loading..."}
            </p>
            <br />
            <Image
              alt="Card background"
              className="object-cover rounded-full border"
              src={userData !== null ? userData.profile.image : "Loading..."}
              width={270}
            />
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Input
              label="소개"
              value={
                userData !== null ? userData.profile.introduction : "Loading..."
              }
              onChange={() => {}}
              type="textarea"
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Profile;
