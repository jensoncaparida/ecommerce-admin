'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-center border rounded-lg p-4 w-fit space-x-4">
        <CldUploadWidget onUpload={onUpload} uploadPreset="qrkw1dzw">
          {({ open }) => {
            const onClick = () => {
              open();
            };

            return (
              <div className="flex flex-col items-center justify-center h-[140px] w-[140px] border border-dashed border-blue-500 rounded-md">
                <div className="p-2">
                  <ImagePlus className="h-6 w-6" />
                </div>
                <Button
                  type="button"
                  disabled={disabled}
                  variant="link"
                  onClick={onClick}
                  size="sm"
                  className="text-blue-500"
                >
                  Click to upload
                </Button>
              </div>
            );
          }}
        </CldUploadWidget>
        <div className="flex items-center gap-4">
          {value.map((url) => (
            <div
              key={url}
              className="relative h-[140px] w-[140px] rounded-md overflow-hidden"
            >
              <div className="z-10 absolute top-2 right-2">
                <Button
                  type="button"
                  onClick={() => onRemove(url)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <Image
                fill
                sizes="(max-width: 200px) 100vw, 200px"
                className="object-cover"
                alt="Image"
                src={url}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
