import './style.css'

interface JokeResponse {
  id: string;
  joke: string;
  status: number
}

interface jokeQuality {
  joke: string;
  score: 1 | 2 | 3;
  date: string;
}
interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number
  };
  clouds: {
    all: number
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

let reportJokes: jokeQuality[] = [];

const JOKEAPI = `https://icanhazdadjoke.com/`;
const jokeElement = <HTMLParagraphElement>document.querySelector('.joke')
const weatherElement = <HTMLParagraphElement>document.querySelector('.weather')

const getJoke = async (): Promise<JokeResponse> => {
  const response = await fetch(JOKEAPI, {
    headers: {
      accept: 'application/json'
    }
  });

  const jokeResponse: JokeResponse = await response.json();

  console.log(jokeResponse.joke);
  jokeElement.innerText = jokeResponse.joke;
  return jokeResponse;
}

const addScore = async (score: 1 | 2 | 3): Promise<JokeResponse> => {
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
}

const getWeather = async (lat: string, lon: string, API_KEY: string, units: string) : Promise<WeatherResponse> => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`);

  const weatherResponse: WeatherResponse = await response.json();
  weatherElement.innerText = `The weather in ${weatherResponse.name} is ${weatherResponse.weather[0].description}`;

  return weatherResponse;
}

getWeather('41.3888', '2.159', import.meta.env.VITE_API_WEATHER, 'metric');
getJoke();

(<any>window).getJoke = getJoke;
(<any>window).addScore = addScore;
