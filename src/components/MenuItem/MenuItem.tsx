// "use client";

export type MenuItemProps = {
  text: string;
  onClick: () => void;

  leftSlot?: React.ReactNode;
};

const MenuItem: React.FC<MenuItemProps> = ({ text, onClick, leftSlot }) => {
  return (
    <button
      onClick={onClick}
      className="attachments-menu-item flex flex-row items-center gap-1.5 text-start px-2 py-1.5 rounded-lg"
    >
      {leftSlot}

      <span>{text}</span>
    </button>
  );
};

export default MenuItem;
