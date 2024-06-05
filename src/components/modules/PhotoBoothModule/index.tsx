"use client";
import Frame from "@/components/elements/Frame";
import useCaptureAndDownload from "@/components/hooks/UseCaptureAndDownload";
import { useRef } from "react";

export default function PhotoBoothModule() {
  const { captureDiv, downloadImage } = useCaptureAndDownload();
  const ref = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (ref.current) {
      try {
        const imageDataURL = await captureDiv(ref.current);
        downloadImage(imageDataURL, 'photobooth_capture.png');
      } catch (error) {
        console.error('Error capturing div:', error);
      }
    }
  };

  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center bg-white">
      <h1 className="mx-auto text-black text-2xl mb-4">Demo Drag & Capture PhotoBooth</h1>
      <div ref={ref} className="flex w-full flex-col gap-y-4 max-w-2xl p-4 md:p-8 bg-gray-200">
        <Frame className="w-full h-[14rem]" imageUrl="/photoprofile.jpeg" />
        <div className="grid grid-cols-2 gap-x-4">
          <Frame className="w-full h-[14rem]" imageUrl="/photoprofile.jpeg" />
          <Frame className="w-full h-[14rem]" imageUrl="/photoprofile.jpeg" />
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="mt-2 md:mt-4 text-sm md:text-lg font-bold w-full max-w-2xl text-white bg-black px-4 py-2 rounded-lg text-center"
      >
        Download Hasil
      </button>
    </main>
  );
}
