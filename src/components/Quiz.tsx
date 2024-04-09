import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { shuffle } from 'lodash';
import { NUMBER_OF_QUESTIONS, triviaService } from '../services/TriviaService';
import { Question as IQuestion, QuestionAnswer, QuestionWithAnswers } from '../interfaces/Question';
import Button from './Button';
import Question from './Question';
import '../styles/Quiz.css';

interface QuizProps {
    category: string;
    difficulty: string;
}

export default function Quiz({ category, difficulty }: QuizProps) {
    const [questions, setQuestions] = useState<QuestionWithAnswers[] | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<QuestionAnswer[]>([]);
    const [showSubmitButton, setShowSubmitButton] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Category and diffficulty can be empty strings
                if (category && difficulty) {
                    const questions = await triviaService.generateQuestions(Number(category), difficulty);

                    const questionsWithAnswers = questions.data.results?.map((question: IQuestion) => {
                        return {
                            question: question.question,
                            answers: shuffle([question.correct_answer, ...question.incorrect_answers].map((answer, index) => {
                                return {
                                    is_correct: index === 0,
                                    text: answer
                                }
                            }))
                        }
                    });

                    setQuestions(questionsWithAnswers);
                }
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
    }, [category, difficulty]);

    const handleAnswerClick = useCallback((answer: QuestionAnswer) => {
        setSelectedAnswers([...selectedAnswers, answer]);

        // We want to render the submit button when all questions are answered
        setShowSubmitButton(selectedAnswers.length === NUMBER_OF_QUESTIONS - 1);
    }, [selectedAnswers]);

    return (
        <section className='container'>
            <section className='questions'>
                {questions?.map((question: QuestionWithAnswers) => (
                    <Question
                        key={question.question}
                        question={question}
                        selectedAnswers={selectedAnswers}
                        handleAnswerClick={handleAnswerClick}
                        readonly={false}
                    />
                ))}
            </section>

            {showSubmitButton && (
                <Button
                    className='submitBtn'
                    handleClick={() => navigate('/results', { state: { questions, selectedAnswers }})}  
                    text='Submit'
                />
            )}
        </section>
    );
}
