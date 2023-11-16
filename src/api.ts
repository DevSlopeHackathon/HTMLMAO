import { Question } from "./Types";

const API_BASE_URL = 'https://the-trivia-api.com/v2';

const fetchQuestionsByCategory = async (category: string): Promise<Question[]> => {
  try {
    const url = new URL(API_BASE_URL + "/questions");
    url.searchParams.append('limit', '50');  
    url.searchParams.append('categories', category); 

    const response = await fetch(url.toString());
    if (!response.ok) {
      console.error('API response:', await response.text());
      throw new Error(`Error fetching questions: ${response.statusText}`);
    }
    const questions: Question[] = await response.json();
    return questions;
  } catch (error) {
    console.error('Failed to fetch questions', error);
    throw error;
  }
};


export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data); 
    return data;
  } catch (error) {
    console.error('Failed to fetch categories', error);
    throw error;
  }
};

export const Requests = {
  fetchQuestionsByCategory,
  fetchCategories,
};