import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatComponent from './components/ChatComponent';
import ChatListComponent from './components/ChatListComponent';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={ <ChatListComponent /> } />
          <Route path="/room/:roomId" element={ <ChatComponent /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
