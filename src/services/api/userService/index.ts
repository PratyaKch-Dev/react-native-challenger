import {httpService, HttpServiceConfig} from 'services/http';

import getUserProfile from './getUserProfile';
import getUserTransactions from './getUserTransactions';
import withdraw from './withdraw';

export default function authService(configs?: HttpServiceConfig) {
  const http = httpService(configs);
  return {
    getUserProfile: getUserProfile(http),
    getUserTransactions: getUserTransactions(http),
    withdraw: withdraw(http),
  };
}
