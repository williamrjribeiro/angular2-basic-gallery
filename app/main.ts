import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

// Bootstrapping isn't core because there isn't a single way to bootstrap the app
platformBrowserDynamic().bootstrapModule(AppModule);
