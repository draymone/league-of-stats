# League of Stats
A React app that allows you to vizualise some data on your League of Legends profile. Not suitable as-is for server use (see [Run on a server](#run-on-a-server))

## How to use
1. Create a src/Config.tsx file and complete it with `export const API_KEY = 'YOUR_API_KEY_GOES_HERE';`
### Run locally
2. Disable CORS on your browser (API calls are rejected because they are made from the browser)
3. Execute `npm install`
4. Execute `npm run dev`
### Run on a server
The project has some problem stopping you from running it on a server. You need to create some backend server, and instead of sending the requests to Riot Games API, send them to the backend server that adds the API key to the request headers, the backend should also maange the spacing between calls to not overwhelm API rates limiting

## Legal
This app isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.

## Code
### CSS properties ordering
1. Position / padding / margin
2. Size
3. Color
4. Typo
5. Flex
