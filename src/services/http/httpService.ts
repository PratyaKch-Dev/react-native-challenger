import axios, {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import Store from 'store';
import {clearUser} from 'store/user/actions';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {openModal} from 'store/modals/actions';
import {MODALS} from 'components/AppModals/Modals';
import {Platform} from 'react-native';

interface ErrorResponse {
  statusCode: any;
  message: any;
}
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _isAuth?: boolean;
}

async function setBaseUrl(config: HttpServiceConfig) {
  const iosUrl = 'http://localhost:3000';
  const androidUrl = 'http://10.0.2.2:3000';
  const baseUrl = Platform.OS === 'ios' ? iosUrl : androidUrl;

  config.baseURL = baseUrl;
  return config;
}
function setAuthorization(
  config: CustomAxiosRequestConfig,
): CustomAxiosRequestConfig {
  const user = Store.getState()?.user;
  console.log('useruseruseruser :: ', user);
  const userToken = user ? user.token : null;
  console.log('useruseruseruser :userToken: ', userToken);
  console.log('useruseruseruser :_isAuth: ', config._isAuth);

  if (userToken && config._isAuth) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  return config;
}

async function setHeaders(config: HttpServiceConfig) {
  config.headers = config.headers ?? {};
  config.headers['Content-Type'] = 'application/json';
  config.withCredentials = true;
  return config;
}
function setRequestId(config: HttpServiceConfig) {
  config._id = new Date().getTime() + (config?.url ? '_' + config.url : '');
  return config;
}
function setUILoading(isShowLoading: boolean, config: HttpServiceConfig) {
  const isShowUILoading =
    config?._uiLoading === undefined ? true : config._uiLoading;
  if (isShowUILoading) {
    if (isShowLoading) {
      //Show loading
    } else {
      //Close loading
    }
  }
}
// Add a request interceptor
axios.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<any> => {
    config = setRequestId(config);
    setUILoading(true, config);
    config = await setBaseUrl(config);
    config = await setHeaders(config);
    config = setAuthorization(config);
    return config;
  },
  (error: AxiosError) => {
    console.log('Error occurred during request:', error);
    setUILoading(false, error.config || ({} as AxiosRequestConfig));
    return Promise.reject(error);
  },
);

//Add a response interceptor
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    const config = response.config as HttpServiceConfig;
    !!config._response && config._response(response);
    setUILoading(false, response.config);
    const responseData: any = {
      isSuccess: true,
      data: response.data || null,
    };
    return Promise.resolve(responseData);
  },
  (error: AxiosError) => {
    console.log('AxiosError:', error.response);
    let errorMessageObj: ErrorResponse = {
      statusCode: error.response?.status,
      message: 'Something went wrong please try again',
    };

    if (error.message === 'Network Error') {
      errorMessageObj.message = 'Network error occurred';
    } else if (error.response?.status) {
      if (error.response && error.response.status === 403) {
        errorMessageObj = error.response.data as ErrorResponse;
        const errorMessage = errorMessageObj.message;

        Store.dispatch(
          openModal({
            modalType: MODALS.MODAL_HANDLER_ERROR_LOGOUT,
            modalProps: {message: errorMessage},
          }),
        );

        return;
      }
      errorMessageObj = error.response.data as ErrorResponse;
      console.log('AxiosError:Message', errorMessageObj);
    }

    return Promise.reject(errorMessageObj);
  },
);

export type HttpServiceError = AxiosError;
export type HttpServiceResponse = AxiosResponse;
export type HttpServiceConfig = AxiosRequestConfig & {
  _isAuth?: boolean;
  _isUploadImage?: boolean;
  _uiLoading?: boolean;
  _response?: (response: AxiosResponse) => void;
  _id?: string;
};
export type HttpServicePromise<T = any> = Promise<AxiosResponse<T>> & {
  cancel: () => void;
};
function r(config: HttpServiceConfig, callback: Function) {
  const cancelTokenSource = axios.CancelToken.source();
  config.cancelToken = cancelTokenSource.token;
  const promise = callback(config);
  const cancel = {
    message: 'Cancel',
    config,
  };
  promise.cancel = () => cancelTokenSource.cancel(JSON.stringify(cancel));
  return promise;
}
export type HttpService<T> = {
  get: (
    url: string,
    params?: any,
    _response?: (response: AxiosResponse<T>) => void,
  ) => HttpServicePromise<T>;
  put: (
    url: string,
    data: any,
    _response?: (response: AxiosResponse<T>) => void,
  ) => HttpServicePromise<T>;
  post: (
    url: string,
    data?: any,
    _response?: (response: AxiosResponse<T>) => void,
  ) => HttpServicePromise<T>;
  delete: (
    url: string,
    data?: any,
    _response?: (response: AxiosResponse<T>) => void,
  ) => HttpServicePromise<T>;
  getWithAuth: (
    url: string,
    params?: any,
    _response?: (response: AxiosResponse<T>) => void,
  ) => HttpServicePromise<T>;
  putWithAuth: (
    url: string,
    data: any,
    _response?: (response: AxiosResponse<T>) => void,
  ) => HttpServicePromise<T>;
  postWithAuth: (
    url: string,
    data?: any,
    _response?: (response: AxiosResponse<T>) => void,
  ) => HttpServicePromise<T>;
  deleteWithAuth: (
    url: string,
    data?: any,
    _response?: (response: AxiosResponse<T>) => void,
  ) => HttpServicePromise<T>;
};
export const httpService = (
  RequestConfig?: HttpServiceConfig,
): HttpService<any> => {
  const configs = RequestConfig || {};
  return {
    get: (url, params, _response) =>
      r({...configs, _response}, (c: HttpServiceConfig) =>
        axios.get(url, {...c, params}),
      ),
    put: (url, data, _response) =>
      r({...configs, _response}, (c: HttpServiceConfig) =>
        axios.put(url, data, c),
      ),
    post: (url, data, _response) =>
      r({...configs, _response}, (c: HttpServiceConfig) =>
        axios.post(url, data, c),
      ),
    delete: (url, data, _response) =>
      r({...configs, _response}, (c: HttpServiceConfig) =>
        axios.delete(url, {...c, data}),
      ),
    getWithAuth: (url, params, _response) =>
      r({...configs, _isAuth: true, _response}, (c: HttpServiceConfig) =>
        axios.get(url, {...c, params}),
      ),
    putWithAuth: (url, data, _response) =>
      r({...configs, _isAuth: true, _response}, (c: HttpServiceConfig) =>
        axios.put(url, data, c),
      ),
    postWithAuth: (url, data, _response) =>
      r({...configs, _isAuth: true, _response}, (c: HttpServiceConfig) =>
        axios.post(url, data, c),
      ),
    deleteWithAuth: (url, data, _response) =>
      r({...configs, _isAuth: true, _response}, (c: HttpServiceConfig) =>
        axios.delete(url, {...c, data}),
      ),
  };
};
