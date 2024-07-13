import axios from 'axios';

// What is the URL of the endpoint?
//https://api.spacetraders.io/v2/register
// What HTTP method does the endpoint use?
//POST
// What headers does the endpoint require?
//--header 'Accept: application/json' \
//--header 'Content-Type: application/json' \
// What data does the endpoint accept in the request body?
//Request body: The new agent’s faction and unique symbol used for the user’s call sign. We won’t need to pass in email, since we don’t need our call sign to persist between server resets.
// What does the endpoint return?
//a JSON object with a bunch of data

export async function register(callSign) {
  const response = await axios.post(
    'https://api.spacetraders.io/v2/register',
    {
      symbol: callSign,
      faction: 'COSMIC',
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  );
  return response;
}