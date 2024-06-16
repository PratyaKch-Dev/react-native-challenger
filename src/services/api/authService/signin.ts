import {HttpService} from 'services/http';
import * as t from 'io-ts';
import {responseDataModel} from 'utils/validate';
import {apiResponseDataError} from 'constants/types/apiResponseDataError';

export const SignInRequestData = t.type({
  phone: t.string,
});

export type SignInRequestData = t.TypeOf<typeof SignInRequestData>;

const dataType = t.type({
  phone: t.string,
  token: t.string,
});

export const SignInResponseDataSuccess = t.type({
  data: dataType,
});

export type SignInResponseDataSuccess = t.TypeOf<
  typeof SignInResponseDataSuccess
>;

export const SignInResponseData = t.union([
  SignInResponseDataSuccess,
  apiResponseDataError,
]);

export type SignInResponseData = t.TypeOf<typeof SignInResponseData>;

export default function signin(http: HttpService<SignInResponseData>) {
  return (data: SignInRequestData) => {
    return http.post(
      '/api/v1/signin',
      data,
      responseDataModel<SignInResponseData>(SignInResponseData),
    );
  };
}
