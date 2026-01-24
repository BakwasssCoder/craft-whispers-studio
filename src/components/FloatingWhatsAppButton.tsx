import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingWhatsAppButton() {
  const handleClick = () => {
    window.open("https://wa.me/916290127405", "_blank");
  };

  return (
    <Button
      variant="whatsapp"
      size="icon"
      className="fixed bottom-24 md:bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      onClick={handleClick}
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">Chat on WhatsApp</span>
    </Button>
  );
}