<template>
  <div class="App">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Package Tracking</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">
          <b>Navigation</b>
        </md-toolbar>
        <md-list>
          <md-list-item class="sidebar-menu-item" @click="navTo('history')">
            <md-icon>local_shipping</md-icon>
            <span class="md-list-item-text">{{ menuModules.history.moduleName }}</span>
          </md-list-item>

          <md-list-item class="sidebar-menu-item" @click="navTo('store')">
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">{{ menuModules.store.moduleName }}</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view />
        <footer class="app-footer">
          &copy; {{ $moment().format('YYYY') }} - supported by
          <a
            class="footer-link"
            href="https://samlinux.at/"
            target="_blank"
          >samlinux.at</a>
        </footer>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    menuVisible: false,
    currentModule: "",
    menuModules: {
      history: {
        moduleName: "Package History",
        modulePath: "/history",
      },
      store: {
        moduleName: "Store",
        modulePath: "/store",
      },
    },
  }),
  mounted() {
    let startModuleName = "history";
    const currentPath = window.location.pathname;
    if (currentPath && currentPath !== "") {
      const currentPathSplit = currentPath.split("/");
      if (currentPathSplit.length > 1) {
        if (
          currentPathSplit[currentPathSplit.length - 1] &&
          currentPathSplit[currentPathSplit.length - 1] !== ""
        ) {
          startModuleName = currentPathSplit[currentPathSplit.length - 1];
        }
      }
    }
    if (this.$router.currentRoute) {
      this.navTo(startModuleName);
    }
  },
  methods: {
    navTo: function (routeName) {
      if (this.menuModules[routeName]) {
        this.setCurrentModuleName(this.menuModules[routeName].moduleName);
        this.$router
          .push(this.menuModules[routeName].modulePath)
          .catch(() => {});
        this.menuVisible = false;
      }
    },
    setCurrentModuleName(moduleName) {
      this.currentModule = moduleName;
    },
  },
};
</script>

<style lang="scss">
.md-app {
  height: 100vh;
  box-sizing: border-box;
  border: 0;
}
.md-content {
  padding: 16px;
}
.md-app-content {
  border-right: 0 !important;
}
.md-drawer {
  width: 230px !important;
  max-width: calc(100vw - 125px) !important;
}
.app-footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 6px 10px;
  z-index: 1;
  background: white;
  border-top: 1px solid #d0d0d0;
  .footer-link {
    color: #2196f3 !important;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
