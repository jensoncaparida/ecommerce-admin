'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ImageModalProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageModal = ({ imageUrl, isOpen, onClose }: ImageModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="max-w-[80%] h-[80%] p-0 m-0">
        <div className="relative w-full h-[100%]">
          <Image
            fill={true}
            sizes="100%"
            alt="Image"
            className="object-fill p-2"
            src={imageUrl}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
