import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { Amplify, Auth } from 'aws-amplify';

if (environment.production) {
  enableProdMode();
}

Amplify.configure({
  Auth: {
    region: 'ca-central-1',
    userPoolId: 'ca-central-1_eHW1dbu3l',
    userPoolWebClientId: 'jjtn2j7j876a13rfj6oqbf2j6',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    oauth: {
      domain: 'https://vxr-fed-test.auth.ca-central-1.amazoncognito.com',
      scope: [
        'email',
        'openid',
        'phone'
      ],
      redirectSignIn: 'https://vitalxr.github.io/vxr-site/login/callback',
      responseType: 'token'
    }
  },
  API: {
    endpoints: [
      {
        name: 'vxr-dev-ag',
        endpoint: 'https://tdsy3cgt61.execute-api.ca-central-1.amazonaws.com/dev',
        custom_header: async () => {
          const token = (await Auth.currentSession()).getIdToken().getJwtToken();
          return { Authorization: token }
        }
      },
      {
        name: 'VitalXRBackendStack',
        endpoint: 'https://2lexkrigof.execute-api.ca-central-1.amazonaws.com/Stage',
        custom_header: async () => {
          const token = (await Auth.currentSession()).getIdToken().getJwtToken();
          return { Authorization: token }
        }
      }
    ]
  }
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
