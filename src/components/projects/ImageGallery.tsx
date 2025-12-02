"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ImageGalleryProps {
  images?: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-gray-100">
        스크린샷
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full pb-[62.5%] rounded-lg overflow-hidden bg-gray-200 dark:bg-zinc-600 cursor-zoom-in"
            onClick={() => setZoomedImage(`/images/${image}`)}
          >
            <Image
              src={`/images/${image}`}
              alt={`스크린샷 ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-zoom-out"
            onClick={() => setZoomedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-[90vw] h-[90vh]"
            >
              <Image
                src={zoomedImage}
                alt="확대된 이미지"
                fill
                sizes="90vw"
                className="object-contain"
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
