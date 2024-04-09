import React, { useEffect, useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import { triviaService } from '../services/TriviaService';
import Category from '../interfaces/Category';
import Dropdown from './Dropdown';
import Button from './Button';
import Quiz from './Quiz';
import '../styles/QuizMaker.css';

const DIFFICULTIES = ['easy', 'medium', 'hard'];

export default function QuizMaker() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await triviaService.getCategories();
        setCategories(result.data.trivia_categories);
      } catch(error) {
        // There is a rate limitation for the number of requests that we can send to the Trivia API
        // That's why we handle this limitation by delaying the requests
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 429) {
            // Retry after increasing delay
            setTimeout(fetchData, 10000 * Math.pow(2, axiosError.response.headers['retry-after'] || 1));
        }
      }
    }

    fetchData();
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    // We want to show the questions when we click the Create button
    setShowQuiz(false);
  };

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(event.target.value);
    // We want to show the questions when we click the Create button
    setShowQuiz(false);
  };

  const categoryOptions = useMemo(() => (
    categories.map(category => ({ key: category.id.toString(), value: category.name }))
  ), [categories]);

  const difficultyOptions = useMemo(() => (
    DIFFICULTIES.map(difficulty => ({ key: difficulty, value: difficulty }))
  ), []);

  return (
    <section className='quiz'>
      <header className='quiz-header'>
        Quiz Maker
      </header>

      <section>
        <Dropdown 
          type='category'
          options={categoryOptions} 
          handleChange={handleCategoryChange}
        />
        <Dropdown
          type='difficulty'
          options={difficultyOptions}
          handleChange={handleDifficultyChange}
        />

        <Button
          type='createBtn'
          text='Create'
          handleClick={() => setShowQuiz(true)}
        />
      </section>

      {showQuiz && <Quiz category={selectedCategory} difficulty={selectedDifficulty} />}
    </section>
  );
}
