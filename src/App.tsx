import { useNavigate } from 'react-router-dom';
import './App.css'

function App() {
  const navigate = useNavigate();

  const handleImageClick = (area: string) => {
    const title = area === 'left' ? 'Be6e' : 'Xev9e';
    navigate('/gen', { 
      state: { title }
    });
  }

  return (
    <div className="split-container">
      <div 
        className="split left"
        onClick={() => handleImageClick('left')}
      >
        <img 
          src="/be6e.jpeg" 
          alt="Be6e"
        />
        <div className="overlay left-overlay">
          
        </div>
      </div>
      <div 
        className="split right"
        onClick={() => handleImageClick('right')}
      >
        <img 
          src="/xev9e.jpeg" 
          alt="Xev9e"
        />
        <div className="overlay right-overlay">
          
        </div>
      </div>
    </div>
  )
}

export default App