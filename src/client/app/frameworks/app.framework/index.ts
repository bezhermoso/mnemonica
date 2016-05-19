// libs
import {provideStore} from '@ngrx/store';
import {routerReducer, routerMiddleware, RouterState} from 'ngrx-store-router';

// app
import {nameListReducer} from './services/name-list.service';

// state definition
export interface AppStoreI {
  router: RouterState;
  names: Array<string>;
};

export const APP_PROVIDERS: any[] = [
  provideStore({ 
    router: routerReducer, 
    names: nameListReducer
  }),
  routerMiddleware
];

// services
export * from './services/app-config.service';
export * from './services/name-list.service';
