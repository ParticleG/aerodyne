export default {
  components: {
    ClientDialog: {
      labels: {
        titles: {
          account: 'Manage Account',
          login: 'Login to an account',
          subscribe: 'Subscribe a new account',
        },
      },
      InfoPanel: {
        labels: {
          title: 'Client Info',
          ok: 'OK',
        },
      },
      SubscribePanel: {
        errors: {
          account: 'Invalid Account',
        },
        labels: {
          account: 'Account',
          cancel: 'Cancel',
          subscribe: 'Subscribe',
        },
      },
    },
    EndpointDialog: {
      descriptions: {
        multiple:
          'Must be a valid EXTRANET host & port.\n' +
          'SSL is forced enable for multiple users mode.',
        single:
          'Must be a valid INTRANET host & port\n' +
          'SSL is required if not using localhost.',
      },
      errors: {
        host: 'Invalid Host',
        port: 'Invalid Port',
      },
      labels: {
        backendMode: 'Backend Mode: ',
        cancel: 'Cancel',
        connect: 'Connect',
        host: 'Host',
        multiple: 'Multiple Users',
        port: 'Port',
        single: 'Single User',
        title: 'Connect to an endpoint',
        useSSL: 'Use SSL',
      },
      notifications:{
        connectFailed: 'Connection failed',
        connectSuccess: 'Connection success',
      }
    },
  },
  pages: {
    ChatPage: {
      labels: {
        loading: 'Loading messages...',
      },
    },
  },
};
