import {httpService, HttpServiceConfig} from 'services/http';

import signin from './signin';

export default function authService(configs?: HttpServiceConfig) {
  const http = httpService(configs);
  return {
    signin: signin(http),
  };
}
