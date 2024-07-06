# Utube

Utube is a simple and easy-to-use video-sharing platform with a totally original name!

## Prequesites
In order to get started, you need to make sure you have the following things installed:
- [Rails](https://guides.rubyonrails.org/getting_started.html#creating-a-new-rails-project-installing-rails) 7.1.0 or higher
- [Node.js](https://nodejs.org/en) 20.15.0 or higher

## Installation
Since this is React On Rails, you will need to ensure dependencies for both Rails and React apps are installed:
1. Install Rails dependencies
`bundle install` (Once you've installed Ruby, you should have `bundler`)

2. Install the React app's dependencies
- Go to the React app by doing `cd client`
- Do `npm install` to install all dependencies
- Back out to the project's root with `cd ..`

3. Prepare environment variables
Create an `.env` file with the following contents:
```
YOUTUBE_API=<insert_your_api_here>
```
That's it! We just need to use Data API from Youtube to get titles, or maybe descriptions from videos

## Database Setup
Be sure that you have the `.env` with the correct contents (See above). Setting up the database is as easy as doing
```
bin/rails db:prepare
```

## Running the application
### Local development
Now that you have set everything up, you can start the development server:
```bash
bin/dev # If permission denied, grant execute permission with `chmod +x bin/dev``
```

This command will trigger 2 processes in the `Procfile.dev` that will start the React app on port 3001 and the Rails app on port 3000.

**Fun facts:** In case you're wondering how both ends are connected, please check `client/vite.config.ts` where you will find the configuration that maps any `/api` requests to our Rails app

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

To wrap up, this is how you start the app locally for development. On production, it's a little different though as we have the front end built out into Rails's `public` folder
```typescript
  build: {
    outDir: "../public",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
      },
    },
  },
```

### Production
Before going on production, make sure your `.env` has the following contents:
```bash
DATABASE_URL=postgres://utube:iloveutube@db/utube # It could be an external source like a Supabase or another Docker container
```
#### Understanding Dockerfile
- At first, we specified the version of Rails and Node.js. We need Ruby to build and run the app while Node.js is for compiling the front-end app into assets that we can serve
```dockerfile
# Make sure RUBY_VERSION matches the Ruby version in .ruby-version and Gemfile
ARG RUBY_VERSION=3.3.2
ARG NODE_VERSION=22.4
```

- We first create a production environment for Rails. Ensure to exclude gems for development only using `BUNDLE_WITHOUT`
```dockerfile
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim as base

# Rails app lives here
WORKDIR /rails

# Set production environment
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development"
```
- After that, we can install the gems so the Rails can function. We also use [bootsnap](https://github.com/Shopify/bootsnap) as Rails standard for faster boot
```dockerfile
FROM base as build

# Install packages needed to build gems
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libpq-dev libvips pkg-config curl

# Install application gems
COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# Copy application code
COPY . .

# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile app/ lib/
```
- The Rails app is good to go. We can start building the front end
```dockerfile
# Install Node.js and yarn
RUN curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash - && \
    apt-get install --no-install-recommends -y nodejs npm

# Build the React app
WORKDIR /rails/client
RUN npm install && npm run build
```
- Finally, we can build out a production-ready Docker image
```dockerfile
FROM base

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y libvips postgresql-client && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built artifacts: gems, application
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails /rails

# Run and own only the runtime files as a non-root user for security
RUN useradd rails --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp
USER rails:rails

# Entrypoint prepares the database.
ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD ["./bin/rails", "server"]
```
#### Using [Fly.io](https://fly.io/)
Fly.io is great at handling your infrastructure by building, running your Dockerfile, and exposing your app over SSL.
See this [documentation](https://fly.io/docs/getting-started/launch/) for how you can install Fly CLI and deploy locally
```bash
fly secrets set DATABASE_URL=<your_database_url> # Set environment variables with fly.io
fly launch # First time deploying
fly deploy # After you have the fly.toml file
```

Look at `fly.toml` file which was generated when first deployed via `fly launch`. If you'd like to run a different command than `./bin/rails db:prepare` after each deployment, you can edit the file to do so as it is [configurable](https://fly.io/docs/reference/configuration)

## Troubleshooting
- In `database.yml`, `prepared_statements` is set to `false` on production because of an issue with connection pooling with Supabase. See this [issue](https://github.com/prisma/prisma/issues/11643)
