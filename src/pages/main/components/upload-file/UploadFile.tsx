import { Upload } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../../components/ui/alert-dialog";
import { Label } from "../../../../components/ui/label";
import { ChatConversation } from "../../../../types";
import { useUploadFile } from "./use-upload-file";

type UploadFileProps = {
  onAttachJSON: (chatConversation: ChatConversation[]) => void;
};
export const UploadFile = (props: UploadFileProps) => {
  const uploadFile = useUploadFile({ onAttachJSON: props.onAttachJSON });

  return (
    <>
      <AlertDialog open={!!uploadFile.error}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Something went wrong</AlertDialogTitle>
            <AlertDialogDescription>{uploadFile.error}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={uploadFile.onClickErrorModalCTA}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div
        className="w-full h-full rounded-lg border-2 border-dashed bg-gray-50 hover:bg-gray-100 hover:border-gray-400"
        {...uploadFile.dropzone.getRootProps()}
      >
        <input
          className="w-full h-[12rem]"
          {...uploadFile.dropzone.getInputProps()}
        />
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Upload className="text-muted-foreground w-7 h-7 text-gray-900" />
            <div className="prose prose-gray flex mt-3 justify-between">
              <Label className="text-sm">Optionally</Label>
              <button className="text-sm font-semibold underline underline-offset-4 mx-1">
                choose a file
              </button>
              <Label className="text-sm">or drag & drop it here</Label>
            </div>
            <Label className="mt-2 text-sm text-gray-500">
              JSON files only
            </Label>
          </div>
        </div>
      </div>
    </>
  );
};
