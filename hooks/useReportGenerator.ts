
import { useCallback, RefObject } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const useReportGenerator = (elementRef: RefObject<HTMLElement>) => {
  const generatePdf = useCallback(async (fileName: string) => {
    const element = elementRef.current;
    if (!element) {
      console.error("Element to capture is not available.");
      return;
    }

    try {
      // html2canvas can have issues with external images if not configured properly.
      // `useCORS: true` helps if images are from a different origin.
      const canvas = await html2canvas(element, {
        scale: 2, // Increase scale for better resolution
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const ratio = imgWidth / imgHeight;
      const widthInPdf = pdfWidth;
      const heightInPdf = widthInPdf / ratio;
      
      let position = 0;
      let heightLeft = heightInPdf;
      
      pdf.addImage(imgData, 'PNG', 0, position, widthInPdf, heightInPdf);
      heightLeft -= pdfHeight;
      
      while (heightLeft > 0) {
        position = heightLeft - heightInPdf;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, widthInPdf, heightInPdf);
        heightLeft -= pdfHeight;
      }
      
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw error;
    }
  }, [elementRef]);

  return { generatePdf };
};
