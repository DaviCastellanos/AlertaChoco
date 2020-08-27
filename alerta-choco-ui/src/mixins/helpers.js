export default {
  computed: {
    userCanVerify() {
      if (this.userAccess == 'private') return true;

      return false;
    },
    userAccess() {
      if (!this.$store.getters.user || !this.$store.getters.user.role) return 'public';
      const role = this.$store.getters.user.role;
      if (role === 'admin' || role === 'analista') return 'private';
      if (role === 'defensor') return 'sensitive';
      return null;
    },
    userAccessIsPrivate() {
      if (!this.$store.getters.user || !this.$store.getters.user.role) return false;
      const role = this.$store.getters.user.role;
      if (role === 'admin' || role === 'analista') return true;
      return false;
    },
    userIsAdmin() {
      if (!this.$store.getters.user) return false;

      return this.$store.getters.user.role == 'admin';
    },
    userIsAuthenticated() {
      if (!this.$store.getters.user) return false;

      return true;
    }
  }
};
