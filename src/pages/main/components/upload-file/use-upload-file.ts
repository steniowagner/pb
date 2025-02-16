import { useCallback, useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";

import { ChatConversation } from "../../../../types";

type UseUploadFile = {
  onAttachJSON: (chatConversation: ChatConversation[]) => void;
};

export const useUploadFile = (params: UseUploadFile) => {
  const [error, setError] = useState<string | undefined>();

  const onDrop = useCallback(
    (acceptedFiles: Parameters<NonNullable<DropzoneOptions["onDrop"]>>[0]) => {
      setError(undefined);
      const file = acceptedFiles[0];
      if (!file || !file?.type || file?.type !== "application/json") {
        setError("Invalid file type. Please upload a JSON file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsedData = JSON.parse(
            event.target?.result as string
          ) as ChatConversation[];
          params.onAttachJSON(parsedData);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err: unknown) {
          setError("Failed to parse JSON file.");
        }
      };
      reader.readAsText(file);
    },
    []
  );

  const dropzone = useDropzone({
    onDrop,
    noClick: false,
    accept: {
      "application/json": [".json"],
    },
  });

  return {
    onClickErrorModalCTA: () => setError(undefined),
    dropzone,
    error,
  };
};
