import Todos from './components/Todos';
import SignIn from './components/SignIn';
import { Route, Routes } from 'react-router-dom';
import styles from './style.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/ana-sayfa" element={<Todos />} />
      </Routes>
    </div>
  );
}

export default App;
