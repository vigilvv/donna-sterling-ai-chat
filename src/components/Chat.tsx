import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, FileDown } from "lucide-react";
import MessageMarkdown from "./MessageMarkdown";
import ImageUploader from "./ImageUploader";
import VoiceInput from "./VoiceInput";
import { fetchPriceEstimate } from "@/api/estimatePrice";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  images?: string[];
  attachments?: {
    type: "pdf";
    url: string;
    name: string;
  }[];
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello, I'm Donna Sterling, your AI Appraiser. How can I assist you with property valuation today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [inputValue]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputValue.trim() && selectedImages.length === 0) || isSubmitting)
      return;

    setIsSubmitting(true);

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      ...(selectedImages.length > 0 && { images: selectedImages }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setSelectedImages([]);

    const getEstimate = async () => {
      try {
        const result = await fetchPriceEstimate(inputValue);
        // setData(result);
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: result.justification,
        };

        setMessages((prev) => [...prev, aiResponse]);
        setIsSubmitting(false);
      } catch (err) {
        // setError("Failed to fetch estimate.");
        console.error(err);
        setIsSubmitting(false);
      }
    };

    getEstimate();

    // Example AI response with different types of content (text, md, pdf attachment)
    //     setTimeout(() => {
    //       // Simulate AI response
    //       const aiResponse: Message = {
    //         id: (Date.now() + 1).toString(),
    //         role: 'assistant',
    //         content: `Thank you for your query! I've analyzed the information provided.

    // ## Property Valuation Report

    // Based on the details and images you've shared, here's my assessment:

    // 1. **Estimated Market Value**: $450,000 - $480,000
    // 2. **Property Type**: Single-family residential
    // 3. **Location Quality**: High (8/10)
    // 4. **Condition Assessment**: Good (7/10)

    // ### Key Factors Influencing This Valuation:
    // - Recent comparable sales in the neighborhood
    // - Current market trends in your region
    // - Property size and features
    // - Overall condition based on visual assessment

    // Would you like me to prepare a detailed PDF report for this property?`,
    //         attachments: [
    //           {
    //             type: 'pdf',
    //             url: '#sample-valuation-report',
    //             name: 'Property_Valuation_Report.pdf',
    //           },
    //         ],
    //       };

    //       setMessages(prev => [...prev, aiResponse]);
    //       setIsSubmitting(false);
    //     }, 2000);
  };

  const handleImagesSelected = (images: string[]) => {
    setSelectedImages(images);
  };

  const handleVoiceTranscript = (transcript: string) => {
    setInputValue(transcript);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <Card
              className={`p-4 max-w-[85%] ${
                message.role === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <MessageMarkdown
                content={message.content}
                className={message.role === "user" ? "text-white" : ""}
              />

              {/* Display uploaded images */}
              {message.images && message.images.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Uploaded ${index}`}
                      className="max-h-32 rounded"
                    />
                  ))}
                </div>
              )}

              {/* Display PDF attachment */}
              {message.attachments?.map((attachment, index) => (
                <div key={index} className="mt-3">
                  <a
                    href={attachment.url}
                    download={attachment.name}
                    className="flex items-center gap-2 text-sm bg-white text-purple-600 px-3 py-2 rounded hover:bg-gray-50"
                  >
                    <FileDown size={16} />
                    <span>{attachment.name}</span>
                  </a>
                </div>
              ))}
            </Card>
          </div>
        ))}
        <div ref={messagesEndRef} />

        {/* Loading indicator */}
        {isSubmitting && (
          <div className="flex justify-start">
            <Card className="p-4 bg-gray-100 text-gray-900">
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </Card>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Image uploader */}
          <ImageUploader onImagesSelected={handleImagesSelected} />

          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message here..."
                className="resize-none min-h-[40px] max-h-[150px]"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
            </div>
            {/* <VoiceInput onTranscript={handleVoiceTranscript} /> */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
