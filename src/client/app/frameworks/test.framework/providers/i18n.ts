// angular
import {provide} from '@angular/core';

// libs
import {TranslateService, TranslateLoader} from 'ng2-translate/ng2-translate';

// mocks
import {TranslateMock} from '../mocks/ng2-translate/ng2-translate.mock';
import {TranslateLoaderMock} from '../mocks/ng2-translate/ng2-translate-loader.mock';

export function TEST_MULTILINGUAL_PROVIDERS(): any[] {
  
  let providers: Array<any> = [
    provide(TranslateLoader, { useClass: TranslateLoaderMock }),
    provide(TranslateService, { useClass: TranslateMock })
  ];
  
  return providers;
}

export function TEST_MULTILINGUAL_RESET(): void {
  // ensure static is reset    
}
