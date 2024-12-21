import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loading } from "@/components/ui/loading"

function Gen() {
  const location = useLocation();
  const { title } = location.state || { title: 'Image Generation' };
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('RAW photo, a portrait photo of a latina woman in casual clothes, natural skin, 8k uhd, high quality, film grain, Fujifilm XT3')
  const [negativePrompt, setNegativePrompt] = useState('(deformed iris, deformed pupils...)') // your existing negative prompt
  const [width, setWidth] = useState(640)
  const [height, setHeight] = useState(360)

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      // Your generation logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="negative_prompt">Negative Prompt</Label>
            <Textarea
              id="negative_prompt"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              className="min-h-[100px]"
            />
            
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        </div>

        {/* Right Column - Preview */}
        <Card className="p-6">
          <div className="bg-muted rounded-lg flex items-center justify-center overflow-hidden h-[600px] relative">
            <div 
              className="flex items-center justify-center"
              style={{
                width: `${width}px`,
                height: `${height}px`,
              }}
            >
              {isLoading ? (
                <Loading />
              ) : (
                "Generated image will appear here"
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Generated in: --:--
            </div>
            <Button variant="outline" size="sm" disabled={isLoading}>
              Download
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Gen

