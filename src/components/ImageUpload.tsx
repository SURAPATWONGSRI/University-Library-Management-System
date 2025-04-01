"use client";
import config from "@/lib/config";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, token, expire } = data;

    return { signature, token, expire };
  } catch (err: any) {
    throw new Error(`Authentication requset Failed ${err.message}`);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: null,
  });

  const onError = (error: any) => {
    console.log("Error uploading file:", error);
    toast.error("Error uploading file", {
      description: `Your image could not be uploaded. Please try again.`,
    });
    console.log("Error uploading file:", error);
    setFile({ filePath: null });
    onFileChange("");
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast.success("File uploaded successfully", {
      description: `${res.filePath} uploaded successfully`,
    });
    console.log("File uploaded successfully:", res);
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="BookWise.png"
      />

      <button
        className="flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="Upload"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-muted-foreground">Upload a file</p>
      </button>
      {file && file.filePath && (
        <div className="mt-4 flex flex-col items-center">
          <p className="text-center text-sm text-foreground mb-2">
            {file.filePath}
          </p>
          <div className="border border-input rounded-md overflow-hidden bg-card p-2 mt-2">
            <IKImage
              alt={file.filePath || "No file uploaded"}
              path={file.filePath}
              width={500}
              height={300}
              className="max-w-full h-auto rounded"
            />
          </div>
        </div>
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
