import Image from "next/image";
import React from "react";
import { string } from "zod";

interface Width {
   xs?: string;
   sm?: string;
   md?: string;
   lg?: string;
}

interface Props {
   width: Width;
   imageUrl: string;
   alt: string;
}

const widthMap: Record<string, Record<string, string>> = {
   xs: {
      full: "w-full",
      "150": "w-[150px]",
      "200": "w-[200px]",
      "300": "w-[300px]",
      "500": "w-[500px]",
      "700": "w-[700px]",
      "900": "w-[900px]",
   },
   sm: {
      full: "sm:w-full",
      "150": "sm:w-[150px]",
      "300": "sm:w-[300px]",
      "500": "sm:w-[500px]",
      "700": "sm:w-[700px]",
      "900": "sm:w-[900px]",
   },
   md: {
      full: "md:w-full",
      "150": "md:w-[150px]",
      "300": "md:w-[300px]",
      "500": "md:w-[500px]",
      "700": "md:w-[700px]",
      "900": "md:w-[900px]",
   },
   lg: {
      full: "lg:w-full",
      "150": "lg:w-[150px]",
      "300": "lg:w-[300px]",
      "500": "lg:w-[500px]",
      "700": "lg:w-[700px]",
      "900": "lg:w-[900px]",
   },
};

const ImageBox = ({ width, imageUrl, alt }: Props) => {
   return (
      <div
         className={`${width.xs && widthMap.xs[width.xs]} ${width.sm && widthMap.sm[width.sm]} ${width.md && widthMap.md[width.md]} ${width.lg && widthMap.lg[width.lg]} h-auto rounded-lg`}
         // className={`w-full h-auto rounded-lg`}
         >
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
