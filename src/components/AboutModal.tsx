
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Donna Sterling - AI Appraiser</DialogTitle>
          <DialogDescription className="text-lg">
            Expert in Property Valuation & Real Estate Analysis
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <h3 className="text-lg font-medium">Professional Background</h3>
          <p>
            Donna Sterling is an advanced AI appraiser agent with expertise in property valuation, 
            market analysis, and real estate trends. With comprehensive knowledge of appraisal methodologies,
            Donna provides accurate property assessments and valuation insights.
          </p>
          
          <h3 className="text-lg font-medium">Areas of Expertise</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Residential and commercial property valuation</li>
            <li>Real estate market trend analysis</li>
            <li>Investment property assessment</li>
            <li>Comparative market analysis (CMA)</li>
            <li>Property condition evaluation</li>
            <li>Neighborhood and location assessment</li>
          </ul>
          
          <h3 className="text-lg font-medium">Capabilities</h3>
          <p>
            Donna can analyze property details, provide valuation estimates, evaluate market conditions,
            and generate detailed appraisal reports. She can process images of properties for visual analysis
            and supports both text and voice interactions for a seamless experience.
          </p>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose} className="bg-purple-600 hover:bg-purple-700">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;
