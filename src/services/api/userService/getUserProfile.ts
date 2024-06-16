import {HttpService} from 'services/http';
import * as t from 'io-ts';
import {responseDataModel} from 'utils/validate';
import {
  apiResponseDataError,
  ApiResponseDataError,
} from 'constants/types/apiResponseDataError';

const userProfileDataType = t.type({
  uid: t.string,
  email: t.string,
  firstname: t.string,
  lastname: t.string,
});

const UserProfileResponseDataSuccess = t.intersection([
  t.type({
    data: userProfileDataType,
  }),
  t.partial({
    errorMessage: t.string,
  }),
]);

export type UserProfileResponseDataSuccess = t.TypeOf<
  typeof UserProfileResponseDataSuccess
>;

const UserProfileResponseDataError = apiResponseDataError;

export type UserProfileResponseDataError = ApiResponseDataError;

const UserProfileResponseData = t.union([
  UserProfileResponseDataSuccess,
  UserProfileResponseDataError,
]);

export type UserProfileResponseData = t.TypeOf<typeof UserProfileResponseData>;

export default function getUserProfile(
  http: HttpService<UserProfileResponseData>,
) {
  return () => {
    return http.getWithAuth(
      '/api/v1/user/profile',
      undefined,
      responseDataModel<UserProfileResponseData>(UserProfileResponseData),
    );
  };
}
