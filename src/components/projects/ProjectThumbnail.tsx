"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ProjectThumbnailProps {
  src: string;
  alt: string;
}

export function ProjectThumbnail({ src, alt }: ProjectThumbnailProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div
        className="mb-8 rounded-lg overflow-hidden cursor-zoom-in"
        onClick={() => setIsZoomed(true)}
      >
        <div className="relative w-full pb-[56.25%]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
      </div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-[90vw] h-[90vh]"
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="90vw"
                className="object-contain"
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
