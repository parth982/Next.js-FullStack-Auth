import React from "react";

interface Props {
  params: { id: number };
}

const UserProfile = ({ params: { id } }: Props) => {
  return (
    <div>
      UserProfile ID: <span className="text-black bg-orange-600">{id}</span>
    </div>
  );
};

export default UserProfile;
