import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { NUMBER_OF_QUESTIONS } from '../services/TriviaService';
import { QuestionAnswer, QuestionWithAnswers } from '../interfaces/Question';
import Button from './Button';
import Question from './Question';
import '../styles/QuizResults.css';

export default function QuizResults() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const score = state.selectedAnswers.reduce((sum: number, answer: QuestionAnswer) => {
        return sum += answer.is_correct ? 1 : 0;
    }, 0);

    const getScoreColorClass = useCallback(() => {
        if (score < 2) {
            return 'red';
        } else if (score >= 2 && score < NUMBER_OF_QUESTIONS - 1) {
            return 'yellow';
        } else {
            return 'green';
        }
    }, [score]);

    return (
        <section className='quiz'>
            <header className='quiz-header'>
                Results
            </header>

            <section>
                {state.questions.map((question: QuestionWithAnswers) => (
                    <Question
                        key={question.question}
                        question={question}
                        selectedAnswers={state.selectedAnswers}
                        readonly={true}
                    />
                ))}
            </section>

            <section className={`score ${getScoreColorClass()}`}>
                You scored {score} out of 5
            </section>

            <Button 
                className='newQuizBtn'
                handleClick={() => navigate('/')}
                text='Create new quiz'
            />
        </section>
    );
}