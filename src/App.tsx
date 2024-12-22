import { useNavigate } from 'react-router-dom';
import './App.css'

function App() {
  const navigate = useNavigate();

  const handleImageClick = (area: string) => {
    const title = area === 'left' ? 'Be6e' : 
                 area === 'center' ? 'Xuv700' : 'Xev9e';
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
          {/* <h2>Be6e</h2> */}
        </div>
      </div>
      <div 
        className="split center"
        onClick={() => handleImageClick('center')}
      >
        <img 
          src="/xuv700.jpg" 
          alt="Xuv700"
        />
        <div className="overlay center-overlay">
          {/* <h2>Xuv700</h2> */}
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
          {/* <h2>Xev9e</h2> */}
        </div>
      </div>
    </div>
  )
}

export default App