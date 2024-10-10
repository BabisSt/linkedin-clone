import React from "react";

interface EditButtonProps {
  functionality: () => void;
}

export default function EditButton({ functionality }: EditButtonProps) {
  return (
    <button
      onClick={functionality}
      className="edit-button opacity-0 transition-opacity duration-300 float-right top-4 right-4 bg-sky-800 text-white px-5 py-1 mb-2 mr-2 rounded"
    >
      Edit
    </button>
  );
}
