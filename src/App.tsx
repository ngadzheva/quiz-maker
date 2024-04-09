import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import QuizResults from './components/QuizResults';
import QuizMaker from './components/QuizMaker';


function App() {
  return (
    <RouterProvider router={router} />
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='' element={<QuizMaker />} />
      <Route path='results' element={<QuizResults />} />
    </Route>
  )
)

export default App;
