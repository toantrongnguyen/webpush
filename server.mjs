import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import webpush from 'web-push';
import { fileURLToPath } from 'url';
// import { JSONFilePreset } from 'lowdb';

// const db = await JSONFilePreset('db.json', { subscriptions: [] })

const pubkey = 'BH19JAvACS1b2J9qa2kLXq0bEmP9NNfAqJMJyzlMtVef36wvt3HX_1KGSdzRmfhqXPj460ZP7WzBKRk1Fl6O6pc';
const privatekey = 'FHAee6f4Af0KzE81At2UmHxY5eM3gaj-dU715KfKvQQ';


webpush.setVapidDetails(
  // used in case the push service notice a problem with your feed and need to contact you
  'mailto:you@example.com',
  pubkey,
  privatekey
);

function sendNotifications(subscriptions) {
  // TODO
}

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
let pushSubscription

app.post('/add-subscription', (request, response) => {
  console.log('/add-subscription');
  console.log(request.body);
  pushSubscription = request.body;
  response.sendStatus(200);
});


app.post('/remove-subscription', (request, response) => {
  console.log('/remove-subscription');
  console.log(request.body);
  response.sendStatus(200);
});

app.post('/notify-me', (request, response) => {
  console.log('/notify-me');
  console.log(request.body);
  response.sendStatus(200);
});

app.post('/notify-all', (request, response) => {
  console.log('/notify-all');

  if (!pushSubscription) {
    return reply.status(400).send('Error: missing subscription');
  }
  webpush.sendNotification(pushSubscription, JSON.stringify({ title: 'Notification', options: { body: "test" } }))
    .then(() => {
      response.sendStatus(200);
    })
});

app.get('/', (request, response) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  response.sendFile(path.join(__dirname, 'views/index.html'));
});

const listener = app.listen(5500, () => {
  console.log(`Listening on port ${listener.address().port}`);
});