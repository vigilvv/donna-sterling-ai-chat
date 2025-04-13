
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Book } from 'lucide-react';
import Chat from '@/components/Chat';
import SterlingLogo from '@/components/SterlingLogo';
import AboutModal from '@/components/AboutModal';

const Index = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-full md:w-80 p-6 border-r bg-white flex flex-col">
        <div className="flex flex-col items-center text-center mb-6">
          <img 
            src="/donna-profile.jpg" 
            alt="Donna Sterling" 
            className="w-40 h-40 rounded-full object-cover border-4 border-purple-100 mb-4"
            onError={(e) => {
              // Fallback in case the image fails to load
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80";
            }}
          />
          <h1 className="text-xl font-semibold text-gray-900">Donna Sterling</h1>
          <p className="text-gray-600">AI Appraiser Agent</p>
          
          <Button 
            variant="outline" 
            className="mt-4 flex items-center gap-2"
            onClick={() => setIsAboutOpen(true)}
          >
            <Book size={16} />
            <span>About Me</span>
          </Button>
        </div>
        
        <div className="mt-auto text-sm text-gray-500">
          <p className="text-center">© 2025 Sterling Intelligence</p>
          <p className="text-center text-xs mt-1">AI-Powered Property Valuation</p>
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b bg-white flex justify-between items-center">
          <h2 className="font-semibold text-lg text-gray-900">Appraisal Assistant</h2>
          <SterlingLogo />
        </div>
        
        {/* Chat component */}
        <div className="flex-1 overflow-hidden chat-gradient">
          <Chat />
        </div>
      </div>
      
      {/* About Modal */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
};

export default Index;
