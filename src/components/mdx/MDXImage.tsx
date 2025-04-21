"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ImageProps } from "next/image";

type Props = Omit<ImageProps, "src"> & {
  src: string;
};

export default function MDXImage({ src, alt, className, ...props }: Props) {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <>
      <span
        className="relative inline-block w-full pt-[56.25%] supports-[aspect-ratio]:aspect-video cursor-zoom-in"
        onClick={toggleZoom}
      >
        <Image
          src={src}
          alt={alt || ""}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-contain ${className || ""}`}
          {...props}
        />
      </span>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-zoom-out"
            onClick={toggleZoom}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-[90vw] h-[90vh]"
            >
              <Image
                src={src}
                alt={alt || ""}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
                quality={100}
                {...props}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
