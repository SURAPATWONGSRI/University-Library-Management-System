"use client";
import { Progress } from "@/components/ui/progress";
import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage, IKUpload, IKVideo, ImageKitProvider } from "imagekitio-next";
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

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const style = {
    button: variant === "dark" ? "bg-accent" : "bg-secondary",
    placeholder:
      variant === "dark" ? "text-accent-foreground" : "text-muted-foreground",
    text: variant === "dark" ? "text-accent-foreground" : "text-foreground",
  };

  const onError = (error: any) => {
    console.log("Error uploading file:", error);
    toast.error(`${type} Upload Failed`, {
      description: `Your ${type} could not be uploaded. Please try again.`,
    });
    setFile({ filePath: null });
    setIsUploading(false);
    onFileChange("");
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    setIsUploading(false);

    toast.success(`${type} uploaded successfully`, {
      description: `${res.filePath} uploaded successfully`,
    });
    console.log("File uploaded successfully:", res);
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast.error("Image size too large", {
          description: "Image size should be less than 20MB",
        });
        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast.error("Video size too large", {
          description: "Video size should be less than 50MB",
        });
        return false;
      }
    }
    return true;
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
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => {
          setProgress(0);
          setIsUploading(true);
        }}
        onUploadProgress={({ loaded, total }) => {
          const percentage = Math.round((loaded / total) * 100);
          setProgress(percentage);
        }}
        folder={folder}
        accept={accept}
      />

      <button
        className={cn(
          "flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md border border-input hover:bg-accent/80 hover:text-accent-foreground transition-colors",
          style.button,
          isUploading && "opacity-50 cursor-not-allowed"
        )}
        onClick={(e) => {
          e.preventDefault();
          if (!isUploading && ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
        disabled={isUploading}
      >
        <Image
          src="/icons/upload.svg"
          alt="Upload"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className={cn("", style.placeholder)}>
          {isUploading ? `Uploading ${type}... ${progress}%` : placeholder}
        </p>
      </button>

      {file && (
        <p className={cn("mt-2 text-center text-xs", style.text)}>
          {file.filePath}
        </p>
      )}

      {isUploading && (
        <div className="mt-2 w-full space-y-2">
          <Progress value={progress} className="h-2 w-full" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Uploading {type}...</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}

      {file &&
        !isUploading &&
        (type === "image" ? (
          <div className="mt-4">
            <IKImage
              alt={file.filePath || "No file uploaded"}
              path={file.filePath || undefined}
              width={500}
              height={300}
              className="max-w-full h-auto rounded-md border border-border"
            />
          </div>
        ) : type === "video" ? (
          <div className="mt-4">
            <IKVideo
              path={file.filePath || undefined}
              controls={true}
              className="h-96 w-full rounded-md border border-border"
            />
          </div>
        ) : null)}
    </ImageKitProvider>
  );
};

export default FileUpload;
