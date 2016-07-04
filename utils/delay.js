import {setTimeout} from 'timers';

const DEFAULT_TIMEOUT = 4000;

export default function delay(timeout = DEFAULT_TIMEOUT) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
