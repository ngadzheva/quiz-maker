import axios from 'axios';
import { CategoryResponse } from '../interfaces/Category';
import { QuestionResponse } from '../interfaces/Question';

export const NUMBER_OF_QUESTIONS = 5;
const QUESTIONS_TYPE = 'multiple';

export default class TriviaAPI {
    private baseUrl;

    constructor() {
        this.baseUrl = 'https://opentdb.com/';
    }

    getCategories(): Promise<CategoryResponse> {
        return axios.get(`${this.baseUrl}/api_category.php`);
    }

    generateQuestions(categoryId: number, difficulty: string): Promise<QuestionResponse> {
        return axios.get(`${this.baseUrl}/api.php?amount=${NUMBER_OF_QUESTIONS}&category=${categoryId}&difficulty=${difficulty}&type=${QUESTIONS_TYPE}`);
    }
}

export const triviaService = new TriviaAPI();