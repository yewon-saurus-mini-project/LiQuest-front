import { User } from "@nextui-org/react";

export default function UserProfileView({ profile }) {
  if (!profile) {
    return <div>로딩 중...</div>;
  }

  return (
    <User
      name={`Level ${profile.user_level}`}
      description={profile.introduction}
      avatarProps={{ src: profile.image }}
    />
  );
}
