import Image from "next/image";

interface ImageGalleryProps {
  images?: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
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
            className="relative w-full pb-[62.5%] rounded-lg overflow-hidden bg-gray-200 dark:bg-zinc-600"
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
    </div>
  );
}
