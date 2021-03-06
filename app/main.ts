// Need to point to global Typings dependencies folder or else a bunch of
// TypeScript errors will be thrown. The app still compiles and works tough.
/// <reference path="../typings/index.d.ts" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import { platformBrowser } from '@angular/platform-browser';

import { AppModule } from './app.module';
//import { AppModuleNgFactory } from '../aot/app/app.module.ngfactory';

// Bootstrapping isn't core because there isn't a single way to bootstrap the app
platformBrowserDynamic().bootstrapModule(AppModule);
//platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
