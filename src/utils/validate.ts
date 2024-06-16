import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import {AxiosResponse} from 'axios';
import * as t from 'io-ts';

export function responseDataModel<T>(Model: t.Type<T>) {
  return (response: AxiosResponse<T>) => {
    const data = get(response, 'data');
    if (!isEmpty(data)) {
      const result = Model.decode(data);
    }
  };
}
