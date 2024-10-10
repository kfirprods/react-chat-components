// "use client";

import { useFilePicker } from "use-file-picker";
import MenuItem from "../MenuItem/MenuItem";
import { useEffect } from "react";
import DocumentIcon from "../svg-icons/DocumentIcon";
import PhotoIcon from "../svg-icons/PhotoIcon";

export type AddAttachmentsMenuProps = {
  onSelect: (files: File[]) => void;
};

const AddAttachmentsMenu: React.FC<AddAttachmentsMenuProps> = ({
  onSelect,
}) => {
  const { openFilePicker: openDocumentsPicker, plainFiles: selectedDocuments } =
    useFilePicker({
      accept: ".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx",
    });
  const { openFilePicker: openPhotosPicker, plainFiles: selectedPhotos } =
    useFilePicker({
      accept: "image/*",
    });

  useEffect(() => {
    if (selectedDocuments.length) {
      onSelect(selectedDocuments);
    }
  }, [selectedDocuments, onSelect]);

  useEffect(() => {
    if (selectedPhotos.length) {
      onSelect(selectedPhotos);
    }
  }, [selectedPhotos, onSelect]);

  return (
    <>
      <MenuItem
        text="Documents"
        onClick={() => openDocumentsPicker()}
        leftSlot={<DocumentIcon />}
      />
      <MenuItem
        text="Photos & Videos"
        onClick={() => openPhotosPicker()}
        leftSlot={<PhotoIcon />}
      />
    </>
  );
};

export default AddAttachmentsMenu;
