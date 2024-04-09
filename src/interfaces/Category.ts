import Response from './Response';

export default interface Category {
    id: number;
    name: string;
}

export interface CategoryResponse extends Response {
    data: {
        trivia_categories: Category[];
    };
}