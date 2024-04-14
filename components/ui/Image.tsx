import Image from "next/image";
import React from "react";

interface Props {
   width: string;
   imageUrl: string;
   alt: string;
}

const widthMap: Record<string, string> = {
   "150": "w-[150px]",
   "300": "w-[300px]",
   "500": "w-[500px]",
   "700": "w-[700px]",
   "900": "w-[900px]",
};

const ImageBox = ({ width, imageUrl, alt }: Props) => {
   return (
      <div className={`${widthMap[width]} h-auto rounded-lg`}>
         <div className="h-0 pb-[60%] relative">
            <Image
               fill
               className="h-full w-full rounded-md object-cover"
               src={imageUrl}
               alt={alt}
            />
         </div>
      </div>
   );
};

export default ImageBox;
