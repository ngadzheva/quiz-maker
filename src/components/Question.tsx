import React, { useCallback } from 'react';
import { QuestionAnswer, QuestionWithAnswers } from '../interfaces/Question';
import Button from './Button';
import { decode } from 'html-entities';

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
            <p>{decode(question.question)}</p>
            {question.answers.map(answer => (
                readonly ? (
                    <Button
                        key={decode(answer.text)}
                        className={`resultBtn ${getAnswerClass(answer)}`}
                        text={decode(answer.text)}
                    />
                ) : (
                    <Button
                        key={decode(answer.text)}
                        className={`answerBtn ${selectedAnswers.includes(answer) && 'selectedAnswerBtn'}`}
                        handleClick={() => handleAnswerClick?.(answer)}
                        text={decode(answer.text)}
                    />
                )
            ))}
        </section>
    );
}