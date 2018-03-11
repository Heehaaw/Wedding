import { ApplicationRef, enableProdMode, NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { createNewHosts } from '@angularclass/hmr';

if (environment.production) {
  enableProdMode();
}

const hmrBootstrap = async (module: any, bootstrap: () => Promise<NgModuleRef<AppModule>>) => {
  module.hot.accept();
  let ngModule: NgModuleRef<AppModule> = await bootstrap();
  ngModule && module.hot.dispose(() => {
    const makeVisible = createNewHosts(ngModule.injector.get(ApplicationRef).components.map(c => c.location.nativeElement));
    ngModule.destroy();
    makeVisible();
  });
};

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule).catch(err => {
  console.log(err);
  return null;
});

if (environment.hmr) {
  if (module['hot']) {
    hmrBootstrap(module, bootstrap);
  }
  else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
}
else {
  bootstrap();
}
