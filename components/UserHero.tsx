import useUser from "@/hooks/useUser";
import Image from "next/image";
import React from "react";
import Avatar from "./Avatar";
interface UserHeroProps {
  userId: string;
}
const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data: user } = useUser(userId);
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {user?.coverImage && (
          <Image
            src={user?.coverImage}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute left-4 -bottom-16">
        <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
