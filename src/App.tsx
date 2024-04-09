import React from 'react';
import { Routes, Route} from "react-router-dom";
import QuizResults from './components/QuizResults';
import QuizMaker from './components/QuizMaker';


function App() {
  return (
    <Routes>
      <Route path='/' element={<QuizMaker />} />
      <Route path='/results' element={<QuizResults />} />
    </Routes>
  );
}

export default App;
