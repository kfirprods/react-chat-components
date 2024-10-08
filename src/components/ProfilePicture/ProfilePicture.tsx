import clsx from "clsx";
import blankProfilePicture from "../../assets/blank-profile-picture.png";

export type ProfilePictureProps = {
  profilePhotoUrl?: string;
  size?: "xl" | "lg" | "md" | "sm";
};

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  profilePhotoUrl,
  size,
}) => {
  size = size || "md";

  return (
    <img
      src={profilePhotoUrl || blankProfilePicture}
      alt="profile"
      draggable={false}
      className={clsx(
        "flex-none",
        "rounded-full",
        "aspect-square",
        "bg-gray-200",
        {
          "w-14 h-14": size === "xl",
          "w-12 h-12": size === "lg",
          "w-9 h-9": size === "md",
          "w-6 h-6": size === "sm",
        }
      )}
      style={{
        padding: !profilePhotoUrl ? "0.5rem" : "0",
      }}
    />
  );
};

export default ProfilePicture;
