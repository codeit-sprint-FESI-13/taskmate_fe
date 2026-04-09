import React from "react";

import ActionButton from "../common/ActionButton/ActionButton";
import UserAvatar from "../common/UserAvatar/UserAvatar";

const ProfileImageUploader = () => {
  return (
    <div className="relative flex w-fit">
      <UserAvatar
        imageUrl={null}
        className="tablet:w-35 tablet:h-35 h-20 w-20"
      />
      <ActionButton
        action="edit"
        className="absolute right-0 bottom-0"
      />
    </div>
  );
};

export default ProfileImageUploader;
