import React from 'react';
import {NavigationContainerRef, ParamListBase} from '@react-navigation/native';
import {EventRegister} from 'react-native-event-listeners';

export enum NAVIGATE {
  NAVIGATE_READY = 'NAVIGATE_READY',
}

let isReadyRef = false;
export const navigationRef =
  React.createRef<NavigationContainerRef<ParamListBase>>();

export function setReadyNavigationRef(value: boolean) {
  isReadyRef = value;
  EventRegister.emit(NAVIGATE.NAVIGATE_READY, navigationRef.current);
}

export function navigateReady(
  callback: (
    navigationContainerRef: NavigationContainerRef<ParamListBase>,
  ) => void,
) {
  if (isReadyRef) {
    if (navigationRef.current) {
      callback(navigationRef.current);
    }
  } else {
    const subscribeNavigateReady = EventRegister.addEventListener(
      NAVIGATE.NAVIGATE_READY,
      () => {
        if (navigationRef.current) {
          callback(navigationRef.current);
          EventRegister.removeEventListener(subscribeNavigateReady as string);
        }
      },
    );
  }
}

export default function navigate() {
  if (isReadyRef && navigationRef.current) {
    return navigationRef.current;
  }
}
