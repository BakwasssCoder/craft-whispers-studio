import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Link, Loader2, X, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
}

export default function MultiImageUpload({ value, onChange, label = 'Images' }: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast({ title: 'Invalid file type', description: `${file.name} is not an image`, variant: 'destructive' });
          continue;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({ title: 'File too large', description: `${file.name} exceeds 5MB limit`, variant: 'destructive' });
          continue;
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(filePath, file);

        if (uploadError) {
          toast({ title: 'Upload failed', description: uploadError.message, variant: 'destructive' });
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('uploads')
          .getPublicUrl(filePath);

        newUrls.push(publicUrl);
      }

      if (newUrls.length > 0) {
        onChange([...value, ...newUrls]);
        toast({ title: `${newUrls.length} image(s) uploaded successfully` });
      }
    } catch (error: any) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddUrl = () => {
    if (urlInput.trim()) {
      onChange([...value, urlInput.trim()]);
      setUrlInput('');
      toast({ title: 'Image URL added' });
    }
  };

  const removeImage = (index: number) => {
    const newUrls = value.filter((_, i) => i !== index);
    onChange(newUrls);
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((url, index) => (
            <div key={index} className="relative">
              <img 
                src={url} 
                alt={`Image ${index + 1}`} 
                className="w-20 h-20 object-cover rounded-lg border border-border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
              >
                <X className="w-3 h-3" />
              </button>
              {index === 0 && (
                <span className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-[10px] px-1 rounded">
                  Main
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="gap-2">
            <Upload className="w-4 h-4" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="url" className="gap-2">
            <Link className="w-4 h-4" />
            URL
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-3">
          <div className="flex items-center gap-2">
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              disabled={uploading}
              className="flex-1"
            />
            {uploading && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Max 5MB each. Select multiple files. JPG, PNG, WebP, GIF</p>
        </TabsContent>
        
        <TabsContent value="url" className="mt-3">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1"
            />
            <Button type="button" onClick={handleAddUrl} variant="secondary" size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
