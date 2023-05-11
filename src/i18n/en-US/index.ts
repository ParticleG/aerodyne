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
      AccountInput: {
        errors: {
          account: 'Invalid Account',
        },
        labels: {
          account: 'Account',
        },
      },
      InfoPanel: {
        labels: {
          title: 'Client Info',
          ok: 'OK',
        },
      },
      LoginPanel: {
        labels: {
          account: 'Account: ',
          cancel: 'Back',
          subscribe: 'Login',
        },
        notifications: {
          success: 'Login success',
          failure: 'Login failure',
          error: 'Login error',
        },
      },
      PasswordInput: {
        errors: {
          password: 'Invalid Password',
        },
        labels: {
          password: 'Password',
        },
      },
      SubscribePanel: {
        labels: {
          cancel: 'Cancel',
          subscribe: 'Subscribe',
        },
        notifications: {
          success: 'Subscribe success',
          failure: 'Subscribe failure',
          error: 'Subscribe error',
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
        cancel: 'Cancel',
        connect: 'Connect',
        host: 'Host',
        port: 'Port',
        title: 'Connect to an endpoint',
      },
      notifications: {
        connectFailed: 'Connection failed',
        connectSuccess: 'Connection success',
      },
      ToggleSection: {
        labels: {
          backendMode: 'Backend Mode: ',
          multiple: 'Multiple',
          single: 'Single',
          useSSL: 'Use SSL',
        },
      },
    },
    ProfileButton: {
      ProfileMenu: {
        labels: {
          accountSettings: 'Account Settings',
          switchAccount: 'Switch Account',
        },
      },
    },
    SessionDrawer: {
      SessionSidebar: {
        labels: {
          toggleDarkMode: 'Toggle Dark Mode',
        },
      },
    },
  },
  pages: {
    ChatPage: {
      labels: {
        loading: 'Loading messages...',
      },
    },
  },
  stores: {
    users: {
      labels: {
        localUser: 'Local User',
      },
    },
  },
};
