import React, { useCallback } from 'react';
import { QuestionAnswer, QuestionWithAnswers } from '../interfaces/Question';
import Button from './Button';

interface QuestionProps {
    question: QuestionWithAnswers;
    selectedAnswers: QuestionAnswer[];
    handleAnswerClick?: (answer: QuestionAnswer) => void;
    readonly: boolean;
}

export default function Question({ question, selectedAnswers, handleAnswerClick, readonly }: QuestionProps) {
    const getAnswerClass = useCallback((answer: QuestionAnswer) => {
        const isAnswerSelected = selectedAnswers.find((selectedAnswer: QuestionAnswer) => selectedAnswer.text === answer.text);

        if (answer.is_correct) {
            return 'correctAnswerBtn';
        } else if (isAnswerSelected && !isAnswerSelected.is_correct) {
            return 'wrongAnswerBtn';
        }

    }, [selectedAnswers]);

    return (
        <section>
            <p>{question.question}</p>
            {question.answers.map(answer => (
                readonly ? (
                    <Button
                        key={answer.text}
                        className={`resultBtn ${getAnswerClass(answer)}`}
                        text={answer.text}
                    />
                ) : (
                    <Button
                        key={answer.text}
                        className={`answerBtn ${selectedAnswers.includes(answer) && 'selectedAnswerBtn'}`}
                        handleClick={() => handleAnswerClick?.(answer)}
                        text={answer.text}
                    />
                )
            ))}
        </section>
    );
}