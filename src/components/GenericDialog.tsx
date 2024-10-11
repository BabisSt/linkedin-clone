import React, { MouseEventHandler, ReactNode } from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";

interface GenericDialogProps {
  open: boolean;
  onClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  title: string;
  children: ReactNode;
  onSave: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}
const GenericDialog = ({
  open,
  onClose,
  title,
  children,
  onSave,
}: GenericDialogProps) => {
  return (
    <Dialog
      open={open}
      handler={onClose}
      className="flex justify-center backdrop-blur-md fixed inset-0 z-50 bg-transparent w-screen h-screen"
      onClick={onClose}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div
        className="fixed inset-0 opacity-50 backdrop-blur-lg w-screen h-screen"
        onClick={onClose}
      />
      <DialogBody
        className="relative md:w-[60%] h-[80%] w-[100%] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <h2 className="text-xl font-bold text-blue-200 mb-4">{title}</h2>
        {children}
        <div className="absolute bottom-0 left-0 w-full flex justify-end p-7">
          <button
            onClick={onClose}
            className="btn border rounded-lg border-blue-300 bg-blue-300 hover:bg-transparent p-1 px-4 font-semibold cursor-pointer text-gray-500 hover:text-black"
          >
            Close
          </button>
          <button
            onClick={onSave}
            className="p-1 px-4 ml-2 font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-center transition-transform transform"
          >
            Save
          </button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default GenericDialog;
