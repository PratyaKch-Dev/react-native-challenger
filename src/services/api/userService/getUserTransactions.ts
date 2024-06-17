import {HttpService} from 'services/http';
import * as t from 'io-ts';
import {responseDataModel} from 'utils/validate';
import {
  apiResponseDataError,
  ApiResponseDataError,
} from 'constants/types/apiResponseDataError';

const transactionDataType = t.type({
  uid: t.number,
  amount: t.number,
  date: t.string,
});

const transactionsDataType = t.type({
  available: t.number,
  transactions: t.array(transactionDataType),
});

const TransactionsResponseDataSuccess = t.intersection([
  t.type({
    data: transactionsDataType,
  }),
  t.partial({
    errorMessage: t.string,
  }),
]);

export type TransactionsResponseDataSuccess = t.TypeOf<
  typeof TransactionsResponseDataSuccess
>;

const TransactionsResponseDataError = apiResponseDataError;

export type TransactionsResponseDataError = ApiResponseDataError;

const TransactionsResponseData = t.union([
  TransactionsResponseDataSuccess,
  TransactionsResponseDataError,
]);

export type TransactionsResponseData = t.TypeOf<
  typeof TransactionsResponseData
>;

export default function getUserTransactions(
  http: HttpService<TransactionsResponseData>,
) {
  return () => {
    return http.getWithAuth(
      '/api/v1/user/transactions',
      undefined,
      responseDataModel<TransactionsResponseData>(TransactionsResponseData),
    );
  };
}
