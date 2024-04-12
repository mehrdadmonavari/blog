"use client";

import { UploadCloudIcon, X } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { twMerge } from "tailwind-merge";

const variants = {
   base: "relative w-full min-h-[150px] min-w-[200px] text-slate-700 rounded-md border border-input flex flex-col justify-center items-center cursor-pointer transition duration-300",
   invalid: "!border-red-500",
   image: "border-indigo-500 shadow-sm p-0 min-h-0 min-w-0 relative dark:bg-slate-900 rounded-md",
   active: "border-indigo-500 shadow-sm",
   disabled:
      "bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700",
   accept: "border border-blue-500 bg-blue-500 bg-opacity-10",
   reject: "border border-red-700 bg-red-700 bg-opacity-10",
};

type InputProps = {
   width?: number;
   height?: number;
   error?: string;
   className?: string;
   value?: File | string;
   onChange?: (file?: File) => void | Promise<void>;
   disabled?: boolean;
   dropzoneOptions?: Omit<DropzoneOptions, "disabled">;
};

const ERROR_MESSAGES = {
   fileRequired(name: string) {
      return `${name} field is required`;
   },
   fileTooLarge(maxSize: number) {
      return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
   },
   fileInvalidType() {
      return "Invalid file type.";
   },
   tooManyFiles(maxFiles: number) {
      return `You can only add ${maxFiles} file(s).`;
   },
   fileNotSupported() {
      return "The file is not supported.";
   },
};

const SingleImageDropzone = React.forwardRef<HTMLInputElement, InputProps>(
   (
      { dropzoneOptions, width, height, error, value, className, disabled, onChange },
      ref
   ) => {
      const imageUrl = React.useMemo(() => {
         if (typeof value === "string") {
            // in case a url is passed in, use it to display the image
            return value;
         } else if (value) {
            // in case a file is passed in, create a base64 url to display the image
            return URL.createObjectURL(value);
         }
         return null;
      }, [value]);
      // dropzone configuration
      const {
         getRootProps,
         getInputProps,
         acceptedFiles,
         fileRejections,
         isFocused,
         isDragAccept,
         isDragReject,
      } = useDropzone({
         accept: {
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
            "image/png": [".png"],
         },
         maxFiles: 1,
         multiple: false,
         disabled,
         onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
               void onChange?.(file);
            }
         },
         ...dropzoneOptions,
      });
      // styling
      const dropZoneClassName = React.useMemo(
         () =>
            twMerge(
               variants.base,
               error && variants.invalid,
               isFocused && variants.active,
               disabled && variants.disabled,
               imageUrl && variants.image,
               (isDragReject ?? fileRejections[0]) && variants.reject,
               isDragAccept && variants.accept,
               className
            ).trim(),
         [
            isFocused,
            imageUrl,
            fileRejections,
            isDragAccept,
            isDragReject,
            disabled,
            className,
            error,
         ]
      );
      // error validation messages
      const errorMessage = React.useMemo(() => {
         if (error) {
            return error;
         }
         if (fileRejections[0]) {
            const { errors } = fileRejections[0];
            if (errors[0]?.code === "file-too-large") {
               return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
            } else if (errors[0]?.code === "file-invalid-type") {
               return ERROR_MESSAGES.fileInvalidType();
            } else if (errors[0]?.code === "too-many-files") {
               return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
            } else {
               return ERROR_MESSAGES.fileNotSupported();
            }
         }
         return undefined;
      }, [fileRejections, dropzoneOptions, error]);

      return (
         <div className="space-y-2">
            <div
               {...getRootProps({
                  className: dropZoneClassName,
                  style: {
                     width,
                     height,
                  },
               })}>
               {/* Main File Input */}
               <input ref={ref} {...getInputProps()} />
               {imageUrl ? (
                  // Image Preview
                  <div className="w-[300px] h-auto">
                     <div className="h-0 pb-[60%] relative">
                        <Image
                           fill
                           className="h-full w-full rounded-md object-cover"
                           src={imageUrl}
                           alt={acceptedFiles[0]?.name}
                        />
                     </div>
                  </div>
               ) : (
                  // Upload Icon
                  <div className="flex flex-col items-center justify-center font-medium text-sm text-slate-400 transition-all duration-300 focus-visible:translate-x-2.5">
                     <UploadCloudIcon className="mb-2 h-7 w-7" />
                     <div className="">drag & drop to upload</div>
                     {/* <div className="mt-3">
                        <Button disabled={disabled}>select</Button>
                     </div> */}
                  </div>
               )}
               {/* Remove Image Icon */}
               {imageUrl && !disabled && (
                  <div
                     className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform"
                     onClick={(e) => {
                        e.stopPropagation();
                        void onChange?.(undefined);
                     }}>
                     <div className="flex h-5 w-5 items-center justify-center rounded-md border border-solid border-gray-500 bg-white transition-all duration-300 hover:h-6 hover:w-6 dark:border-gray-400 dark:bg-black">
                        <X
                           className="text-gray-500 dark:text-gray-400"
                           width={16}
                           height={16}
                        />
                     </div>
                  </div>
               )}
            </div>
            {/* Error Text */}
            <p className="text-sm font-medium text-destructive">{errorMessage}</p>
         </div>
      );
   }
);

SingleImageDropzone.displayName = "SingleImageDropzone";
const Button = React.forwardRef<
   HTMLButtonElement,
   React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
   return (
      <button
         className={twMerge(
            // base
            "focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
            // color
            "border border-gray-400 text-gray-400 shadow hover:bg-gray-100 hover:text-gray-500 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700",
            // size
            "h-6 rounded-md px-2 text-xs",
            className
         )}
         ref={ref}
         {...props}
      />
   );
});

Button.displayName = "Button";
function formatFileSize(bytes?: number) {
   if (!bytes) {
      return "0 Bytes";
   }
   bytes = Number(bytes);
   if (bytes === 0) {
      return "0 Bytes";
   }
   const k = 1024;
   const dm = 2;
   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
   const i = Math.floor(Math.log(bytes) / Math.log(k));
   return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
export { SingleImageDropzone };