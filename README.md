# Lo-flo

Lo-flo is a localized flashcard app, run on your client via docker (postgresql), react and node.

## Screenshots
![Gif on how it works](https://imgur.com/bOdblj3)


## How To Run

First, install all required dependencies on folders `client` and `server` via `yarn`

Run Docker Compose
```
~/server
> docker compose up
// This will start your postgres server, mapped to PORT=5433:5432
```

Migrate Database
```
~/server
> yarn prisma migrate dev --name init
```

Run Node Server
```
~/server
> yarn devStart
```

Run React
```
~/client
> yarn start
```

### Additional

Pre-populate Database via seed.js
```
~/server
> yarn prisma db seed
```

