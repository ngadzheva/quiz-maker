import Response from './Response';

export interface Question {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface QuestionAnswer {
    is_correct: boolean;
    text: string;
}

export interface QuestionWithAnswers {
    question: string;
    answers: QuestionAnswer[];
}

export interface QuestionResponse extends Response {
    data: {
        results: Question[]
    };
}