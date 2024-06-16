import * as t from 'io-ts';

export const apiResponseDataError = t.type({
  message: t.string,
});

export type ApiResponseDataError = t.TypeOf<typeof apiResponseDataError>;
