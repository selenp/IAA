import Rollbar from 'rollbar';

// Track error by rollbar.com
if (location.host === 'dlcgvva1001.dir.svc.accenture.com') {
  Rollbar.init({
    accessToken: '06545cb864d94e7d88de7e1e6c5ba9d9',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  });
}
