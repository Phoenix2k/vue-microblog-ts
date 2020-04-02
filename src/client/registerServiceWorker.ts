/* tslint:disable:no-console */
import { register } from 'register-service-worker';

if ('production' === process.env.NODE_ENV) {
  register(`${process.env.BASE_URL}service-worker.js`, {
    cached() {
      console.log('Content has been cached for offline use.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    ready() {
      console.log(`App is being served from cache by a service worker.\n'
				For more details, visit https://goo.gl/AFskqB`);
    },
    updated() {
      console.log('New content is available; please refresh.');
    }
  });
}
