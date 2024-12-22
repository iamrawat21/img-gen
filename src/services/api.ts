interface GenerateImageParams {
  prompt: string;
  aspectRatio: string;
}

export async function generateImage({ prompt, aspectRatio }: GenerateImageParams) {
  const response = await fetch('http://127.0.0.1:8080/send-prompt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    credentials: 'include',
    body: JSON.stringify({
      prompt,
      aspect_ratio: aspectRatio,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate image');
  }

  return response.json();
}

interface GenerationStatus {
  image_url: boolean;
  response: string;
  status: 'processing' | 'complete' | 'failed';
  imageUrl?: string;
  progress?: number;
  generationTime?: string;
}

export async function checkGenerationStatus(image_id: string): Promise<GenerationStatus> {
  const response = await fetch(`http://127.0.0.1:8080/get-status?image_id=${image_id}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    credentials: 'include',
  });
  console.log("response step 1 :", response);
  
  if (!response.status) throw new Error('Status check failed');
  return response.json();
} 