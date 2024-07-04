# Utube

Utube is a simple and easy-to-use video sharing platform with a totally original name!

## Prequesites
In order to get started, you need to make sure you the following things installed:
- [Rails](https://guides.rubyonrails.org/getting_started.html#creating-a-new-rails-project-installing-rails) 7.1.0 or higher
- [Node.js](https://nodejs.org/en) 20.15.0 or higher

## Installation
Since this is React On Rails, you will need to ensure dependencies for both Rails and React apps are installed:
1. Install Rails dependencies
`bundle install` (Once you've installed Ruby, you should have `bundler`)

2. Install React app's dependencies
- Go to the React app by doing `cd client`
- Do `npm install` to install all dependencies
- Back out to the project's root with `cd ..`

3. Prepare environment variables
Create an `.env` file with the following contents:
```
POSTGRES_USER=utube
POSTGRES_PASSWORD=iloveutube
```

**Fun facts: You don't actually need `POSTGRES_PASSWORD` and you can just set `POSTGRES_USER` to whatever name you like**

## Database Setup
Be sure that you have the `.env` with the correct contents (See above). Setting up the database is as easy as doing
```
bin/rails db:prepare
```

## Local development
Now that you have setup everything, you can start the development server:
```
bundle exec foreman start
```

This command will trigger 2 processes in the `Procfile` that will start the React app on port 3001 and the Rails app on port 3000.

**Fun facts: In case you're wondering how both ends are connected, please check `client/vite.config.ts` where you will find configuration that maps any `/api` requests to our Rails app**

```typescript
  server: {
    host: "localhost",
    port: 3001,
    proxy: {
      "^/api/.*": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
```

To wrap up, this is how you start the app locally for development. On production it's a little different though. We'll talk about it later

<!-- Things you may want to cover: -->
<!---->
<!-- * Ruby version -->
<!---->
<!-- * System dependencies -->
<!---->
<!-- * Configuration -->
<!---->
<!-- * Database creation -->
<!---->
<!-- * Database initialization -->
<!---->
<!-- * How to run the test suite -->
<!---->
<!-- * Services (job queues, cache servers, search engines, etc.) -->
<!---->
<!-- * Deployment instructions -->
<!---->
<!-- * ... -->
