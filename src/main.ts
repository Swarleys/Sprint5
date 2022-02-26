import './style.css';
import { JokeDadResponse, JokeNorrisResponse, jokeQuality, WeatherResponse } from './Interfaces/interfaces';

let reportJokes: jokeQuality[] = [];

const JOKEAPI = `https://icanhazdadjoke.com/`;
const NORRISAPI = `https://api.chucknorris.io/jokes/random`;
const jokeElement = <HTMLParagraphElement>document.querySelector('.joke')
const weatherElement = <HTMLParagraphElement>document.querySelector('.weather')

const getDadJoke = async (): Promise<JokeDadResponse> => {
  const response = await fetch(JOKEAPI, {
    headers: {
      accept: 'application/json'
    }
  });

  const jokeResponse: JokeDadResponse = await response.json();

  console.log(jokeResponse.joke);
  jokeElement.innerText = jokeResponse.joke;
  return jokeResponse;
};

const getNorrisJoke = async (): Promise<JokeNorrisResponse> => {
  const response = await fetch(NORRISAPI);

  const jokeResponse: JokeNorrisResponse = await response.json();

  console.log(jokeResponse.value);
  jokeElement.innerText = jokeResponse.value;
  return jokeResponse;
};

const addScore = async (score: 1 | 2 | 3): Promise<JokeDadResponse | JokeNorrisResponse> => {
  const joke: string = <string>jokeElement.innerText;
  const timeOfVoting = new Date();
  const date = timeOfVoting.toISOString();

  const reportJoke: jokeQuality = {
    joke,
    score,
    date
  }

  reportJokes.push(reportJoke);

  console.log(`In this sesion the user has seen a total of ${reportJokes.length} and this are the scores:`, reportJokes);

  return await getJoke();
};

const getWeather = async (lat: string, lon: string, API_KEY: string, units: string): Promise<WeatherResponse> => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`);

  const weatherResponse: WeatherResponse = await response.json();
  weatherElement.innerText = `The weather in ${weatherResponse.name} is ${weatherResponse.weather[0].description}`;

  return weatherResponse;
};

const getJoke = (): Promise<JokeDadResponse | JokeNorrisResponse> => {
  const random = Math.ceil(Math.random() * 10);

  return random < 5 ? getDadJoke() : getNorrisJoke()
}

getWeather('41.3888', '2.159', import.meta.env.VITE_API_WEATHER, 'metric');
getJoke();

(<any>window).getJoke = getJoke;
(<any>window).addScore = addScore;
