<template>
  <div class="App">
    <div class="app-container">
      <md-app md-waterfall md-mode="fixed">
        <md-app-drawer md-right md-fixed :md-active.sync="menuVisible">
          <md-toolbar class="md-transparent md-drawer-header" md-elevation="0">
            <b>Navigation</b>
          </md-toolbar>
          <md-list>
            <md-list-item class="sidebar-menu-item" @click="navTo('history')">
              <md-icon>local_shipping</md-icon>
              <span class="md-list-item-text">{{
                menuModules.history.moduleName
              }}</span>
            </md-list-item>
            <md-list-item class="sidebar-menu-item" @click="navTo('store')">
              <md-icon>move_to_inbox</md-icon>
              <span class="md-list-item-text">{{
                menuModules.store.moduleName
              }}</span>
            </md-list-item>
          </md-list>
        </md-app-drawer>
        <md-app-toolbar class="md-primary">
          <span class="md-title">
            <div class="app-logo">
              <img
                @click="navTo('history')"
                src="./assets/images/sats_logo.png"
                alt="Airfreights Shipments SATS"
                title="Airfreights Shipments SATS"
              />
              <span class="app-logo-text">Airfreights Shipments</span>
            </div>
          </span>
          <div class="app-menu-button">
            <md-button
              class="md-icon-button"
              @click="menuVisible = !menuVisible"
            >
              <md-icon>menu</md-icon>
            </md-button>
          </div>
        </md-app-toolbar>
        <md-app-content>
          <router-view />
        </md-app-content>
      </md-app>
    </div>
    <footer class="app-footer">
      &copy; {{ $moment().format("YYYY") }} - supported by
      <a class="footer-link" href="https://samlinux.at/" target="_blank"
        >samlinux.at</a
      >
    </footer>
  </div>
</template>

<script src="./App.js"></script>
<style src="./App.scss" lang="scss" scoped></style>