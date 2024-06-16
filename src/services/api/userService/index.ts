import {httpService, HttpServiceConfig} from 'services/http';

import getUserProfile from './getUserProfile';

export default function authService(configs?: HttpServiceConfig) {
  const http = httpService(configs);
  return {
    getUserProfile: getUserProfile(http),
  };
}
