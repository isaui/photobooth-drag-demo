import { useCallback } from 'react';
import { toPng } from 'html-to-image';

const useCaptureAndDownload = () => {
  const captureDiv = useCallback((ref: HTMLDivElement): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (ref) {
        // Sembunyikan elemen dengan kelas 'hide'
        const hiddenElements = Array.from(ref.querySelectorAll('.hide')) as HTMLElement[];
        hiddenElements.forEach((element) => {
          element.style.display = 'none';
        });

        toPng(ref, { cacheBust: true })
          .then((dataUrl) => {
            // Tampilkan kembali elemen yang disembunyikan
            hiddenElements.forEach((element) => {
              element.style.display = '';
            });
            resolve(dataUrl);
          })
          .catch((error) => {
            // Tampilkan kembali elemen jika terjadi error
            hiddenElements.forEach((element) => {
              element.style.display = '';
            });
            reject(error);
          });
      } else {
        reject('ref tidak tersedia');
      }
    });
  }, []);

  const downloadImage = useCallback((dataUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return { captureDiv, downloadImage };
};

export default useCaptureAndDownload;



  