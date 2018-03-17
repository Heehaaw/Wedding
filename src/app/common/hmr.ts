import { createNewHosts } from '@angularclass/hmr';
import { ApplicationRef, NgModuleRef } from '@angular/core';
import { AppModule } from '../app.module';

export const hmrState = {isPersistance: false};

export const hmrBootstrap = async (module: any, bootstrap: () => Promise<NgModuleRef<AppModule>>) => {
  module.hot.accept();
  let ngModule: NgModuleRef<AppModule> = await bootstrap();
  ngModule && module.hot.dispose(() => {
    const makeVisible = createNewHosts(ngModule.injector.get(ApplicationRef).components.map(c => c.location.nativeElement));
    ngModule.destroy();
    makeVisible();
  });
};
