import {HttpService} from 'services/http';
import * as t from 'io-ts';
import {responseDataModel} from 'utils/validate';
import {apiResponseDataError} from 'constants/types/apiResponseDataError';

export const WithdrawRequestData = t.type({
  amount: t.string,
});

export type WithdrawRequestData = t.TypeOf<typeof WithdrawRequestData>;

const WithdrawResponseDataType = t.type({
  message: t.string,
});

export type WithdrawResponseDataSuccess = t.TypeOf<
  typeof WithdrawResponseDataType
>;

export const WithdrawResponseData = t.union([
  WithdrawResponseDataType,
  apiResponseDataError,
]);

export type WithdrawResponseData = t.TypeOf<typeof WithdrawResponseData>;

export default function withdraw(http: HttpService<WithdrawResponseData>) {
  return (data: WithdrawRequestData) => {
    return http.postWithAuth(
      '/api/v1/user/withdraw',
      data,
      responseDataModel<WithdrawResponseData>(WithdrawResponseData),
    );
  };
}
