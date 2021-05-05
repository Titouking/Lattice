# Take home movie application assignment

## To run this project, follow these steps:

1. Create an .env file in the server directory folder with your TMDB API key and value (e.g. API_KEY={API_KEY_VALUE})
2. Run the server by going into the server directory folder `cd server`, installing dependencies with `npm install` and then starting the service with `npm start`. Server will be started on http://localhost:4000.
3. Run the client in a separate terminal by going into client directory folder `cd client`, installing dependencies with `npm install` and then starting service with `npm start`. Client application will be started on http://localhost:3000.
4. The front end movie application will be available on http://localhost:3000.


## Features:

1. List popular movies on load.
2. User can search for movies using keywords in the search bar.
3. Clicking on a movie will display more details about the movie.
4. List top rated and now playing movies as well from the home page.
5. List similar movies when selecting a specific movie.
6. Server side caching using node-cache.
