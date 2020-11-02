import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

const popularMovies = [
  {"popularity":3089.11,"vote_count":50,"video":false,"poster_path":"/ugZW8ocsrfgI95pnQ7wrmKDxIe.jpg","id":724989,"adult":false,"backdrop_path":"/86L8wqGMDbwURPni2t7FQ0nDjsH.jpg","original_language":"en","original_title":"Hard Kill","genre_ids":[28,53],"title":"Hard Kill","vote_average":4.3,"overview":"The work of billionaire tech CEO Donovan Chalmers is so valuable that he hires mercenaries to protect it, and a terrorist group kidnaps his daughter just to get it.","release_date":"2020-10-23"},
  {"popularity":2968.909,"vote_count":425,"video":false,"poster_path":"/betExZlgK0l7CZ9CsCBVcwO1OjL.jpg","id":531219,"adult":false,"backdrop_path":"/8rIoyM6zYXJNjzGseT3MRusMPWl.jpg","original_language":"en","original_title":"Roald Dahl's The Witches","genre_ids":[14,10751,12,35,27],"title":"Roald Dahl's The Witches","vote_average":7.2,"overview":"In late 1967, a young orphaned boy goes to live with his loving grandma in the rural Alabama town of Demopolis. As the boy and his grandmother encounter some deceptively glamorous but thoroughly diabolical witches, she wisely whisks him away to a seaside resort. Regrettably, they arrive at precisely the same time that the world's Grand High Witch has gathered.","release_date":"2020-10-26"}
];

const server = setupServer(
  rest.get('/', (req, res, ctx) => {
    return res(ctx.json({ message: popularMovies }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads the app', async () => {
  const { getByText, getByPlaceholderText } = render(<App />);
  const popularBtn = getByText(/Popular/i);
  const topRatedBtn = getByText(/Top Rated/i);
  const nowPLayingBtn = getByText(/Now Playing/i);

  expect(popularBtn).toBeInTheDocument();
  expect(topRatedBtn).toBeInTheDocument();
  expect(nowPLayingBtn).toBeInTheDocument();
  
  screen.debug();

  const searchInput = getByPlaceholderText('i.e. Jurassic Park');
  expect(searchInput).toBeInTheDocument();
  const searchBtn = getByText(/Search/i);
  expect(searchBtn).toBeInTheDocument();
})
