import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loading } from "@/components/ui/loading"
import { generateImage, checkGenerationStatus } from '@/services/api'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface StatusResponse {
  response: 'processing' | 'completed';
  status: string;
  retry: string;
  image_url?: string;
}

function Gen() {
  const location = useLocation();
  const { title } = location.state || { title: 'Image Generation' };
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generationTime, setGenerationTime] = useState<string>('--:--');
  const [progress, setProgress] = useState(0);

  const aspectRatios = {
    "1:1": { width: 512, height: 512 },
    "16:9": { width: 912, height: 512 },
    "9:16": { width: 512, height: 912 },
    "4:3": { width: 680, height: 512 },
    "3:4": { width: 512, height: 680 }
  };

  const pollStatus = async (image_id: string) => {
    console.log('Polling status for image_id:', image_id);
    // while (true) {
      try {
        const status = await checkGenerationStatus(image_id);
        // const status: StatusResponse = response;
        
        
        console.log('Check generation status response here:', status);

        // Update progress if available
        if (status.response === 'processing' && status.status) {
          setProgress(parseInt(status.status) || 0);
          setTimeout(() => {
            pollStatus(image_id);
          }, 5000);
        }

        if (status.response === 'completed' && status.image_url) {
        //   const imageUrl = `http://127.0.0.1:8080/local-image/${image_id}`;
          const imageUrl = status.image_url;
          setGeneratedImage(imageUrl);
          setIsLoading(false);
        //   break;
        }

        // Poll every 1 second while processing
        // await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Error checking status:', error);
        setIsLoading(false);
        // break;
      }
    // }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setGeneratedImage(null);
    setProgress(0);
    
    try {
      console.log('Sending request to generate image...');
      const response = await generateImage({
        prompt: prompt.trim(),
        aspectRatio,
      });
      console.log('Generate image response:', response);
      
      if (response && response.image_id) {
        console.log('Starting to poll status for image ID:', response.image_id);
        await pollStatus(response.image_id);
      } else {
        throw new Error('No task ID received');
      }
    } catch (error) {
      console.error('Failed to generate:', error);
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedImage) return;
    
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="h-[500px]"
              placeholder="Describe the image you want to generate..."
            />
          </div>

          <div className="space-y-2">
            <Label>Aspect Ratio</Label>
            <Select
              value={aspectRatio}
              onValueChange={setAspectRatio}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select aspect ratio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1:1">Square (1:1)</SelectItem>
                <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                <SelectItem value="4:3">Standard (4:3)</SelectItem>
                <SelectItem value="3:4">Portrait (3:4)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full" 
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        </div>

        <Card className="p-6">
          <div className="bg-muted rounded-lg flex items-center justify-center overflow-hidden h-[400px] lg:h-[600px] relative">
            <div 
              className="flex items-center justify-center"
              style={{
                width: `${aspectRatios[aspectRatio as keyof typeof aspectRatios].width}px`,
                height: `${aspectRatios[aspectRatio as keyof typeof aspectRatios].height}px`,
              }}
            >
              {isLoading ? (
                <Loading progress={progress} />
              ) : generatedImage ? (
                <img 
                  src={generatedImage} 
                  alt="Generated" 
                  className="w-full h-full object-contain"
                />
              ) : (
                "Generated image will appear here"
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Generated in: {generationTime}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDownload}
              disabled={!generatedImage || isLoading}
            >
              Download
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Gen


