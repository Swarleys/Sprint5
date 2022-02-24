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

let reportJokes: jokeQuality[] = [];

const JOKEAPI = `https://icanhazdadjoke.com/`;
const jokeElement = <HTMLParagraphElement>document.querySelector<HTMLParagraphElement>('.joke')

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

getJoke();

(<any>window).getJoke = getJoke;
(<any>window).addScore = addScore;