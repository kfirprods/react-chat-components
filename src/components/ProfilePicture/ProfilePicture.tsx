import clsx from "clsx";
import blankProfilePicture from "../../assets/blank-profile-picture.png";
import styles from "./ProfilePicture.module.css";

export type ProfilePictureProps = {
  profilePhotoUrl?: string;
};

const ProfilePicture: React.FC<ProfilePictureProps> = ({ profilePhotoUrl }) => {
  return (
    <img
      src={profilePhotoUrl || blankProfilePicture}
      alt="profile"
      className={clsx(
        "flex-none",
        "rounded-full",
        "aspect-square",
        "bg-gray-200",
        styles["profile-photo"]
      )}
      style={{
        padding: !profilePhotoUrl ? "0.5rem" : "0",
      }}
    />
  );
};

export default ProfilePicture;
