export default {
  components: {
    AccountDialog: {
      labels: {
        titles: {
          account: 'Manage Account',
          subscribe: 'Subscribe a new account',
          login: 'Login to an account',
        },
      },
      AccountPanel: {
        labels: {
          title: 'Account List',
          noAccounts: 'No accounts found',
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
  },
  pages: {
    ChatPage: {
      labels: {
        loading: 'Loading messages...',
      },
    },
  },
};
