import { Question, LeaderBoard } from "./Types";

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

export const fetchLeaderboard = async (): Promise<LeaderBoard[]> => {
  try {
    // Make a GET request to the leaderboard API endpoint
    const response = await fetch(`http://localhost:3000/LeaderBoard`);

    // Check if the response status is OK (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON data from the response
    const data: LeaderBoard[] = await response.json();

    // Return the parsed data as an array of LeaderBoard objects
    return data;
  } catch (error) {
    // Handle and log any errors that occur during the request
    console.error('Failed to fetch leaderboard', error);
    throw error; // Rethrow the error for further handling, if needed
  }
};



export const Requests = {
  fetchQuestionsByCategory,
  fetchCategories,
  fetchLeaderboard,
};