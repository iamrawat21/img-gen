interface LoadingProps {
  progress: number;
}

export function Loading({ progress }: LoadingProps) {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="text-sm text-muted-foreground mt-2">
        Generating... {progress}%
      </p>
    </div>
  )
} 