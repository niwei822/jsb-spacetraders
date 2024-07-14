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
// 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiTVktQ0FMTC1TSUdONCIsInZlcnNpb24iOiJ2Mi4yLjAiLCJyZXNldF9kYXRlIjoiMjAyNC0wNi0zMCIsImlhdCI6MTcyMDkyMDc4NSwic3ViIjoiYWdlbnQtdG9rZW4ifQ.WNGmYBgsJ_9_3UC2I1-viBZBp5R5mmF-xN6LI8bZMOLVM8Z1pJfOZgtdrkm2wB8SYGnrLRagi5cpJIFeQ5-jwDCXmiaAZVRFYQeDkeDVOcKFVWDOh55QlQALABt-9UGAvz3BuZoRUzeM5WmCPYc-_oX_zejIuxrEbch9QGIV4Oqc386QvhTg9mg6FYq0Eb3Tj_LvK9HzKcoXF7qDHKR0KGBR7v9vjm1kyqBdUcDDE5jMrLn9oYMIjHyE9ZICqn1wXKxuQFfWKno9dTIc8BDAuMXJkgXEfSs-GwWUdyf1FBcBZ9YRjhBIaYDm1zaJBQ3hOsspbmR2puabUSks9XYuBw'
export const TOKEN = process.env.SPACETRADERS_TOKEN;
if (!TOKEN) {spacetraders.TOKEN
  throw new Error('SPACETRADERS_TOKEN is not defined in the environment variables');
}
const api = axios.create({
  baseURL: 'https://api.spacetraders.io/v2',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
});
export async function getAgent() {
  const response = await api.get('/my/agent');
  return response.data;
}

export async function getStartwayPoint() {
  const { data } = await getAgent();
  const hqWaypoint = data.headquarters;
  const [sector, system] = hqWaypoint.split('-');
  const systemSymbol = `${sector}-${system}`;
  const response = await getWaypoint(systemSymbol, hqWaypoint);
  return response.data;
}
export async function getWaypoint(systemSymbol, waypointSymbol) {
  const response = await api.get(
    `/systems/${systemSymbol}/waypoints/${waypointSymbol}`
  );
  return response.data;
}

export async function viewContracts() {
  const response = await api.get('my/contracts');
  return response.data;
}
//Accept your contract
//clykvsw4qua6is60cik1rr7pc
export async function acceptContract(contractId) {
  const response = await api.post(`my/contracts/${contractId}/accept`);
  return response.data;
}
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

//X1-DY6-A1