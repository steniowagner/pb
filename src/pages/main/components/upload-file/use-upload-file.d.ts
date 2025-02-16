import { ChatConversation } from "../../../../types";
type UseUploadFile = {
    onAttachJSON: (chatConversation: ChatConversation[]) => void;
};
export declare const useUploadFile: (params: UseUploadFile) => {
    onClickErrorModalCTA: () => void;
    dropzone: import("react-dropzone").DropzoneState;
    error: string | undefined;
};
export {};
//# sourceMappingURL=use-upload-file.d.ts.map