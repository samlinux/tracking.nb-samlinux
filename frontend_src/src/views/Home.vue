<template>
  <layout-default>
    <div class="Home">
      <div>
        <form novalidate class="md-layout" id="app" action="#" method="post">
          <md-card class="md-layout-item md-small-size-100">
            <md-card-header>
              <div class="md-title">Package History</div>
            </md-card-header>
            <md-card-content>
              <label for="pId">Package ID</label>
              <md-field>
                <md-input v-on:keydown.enter.prevent="refresh" name="pId" id="pId" v-model="pId" />
              </md-field>
              <md-card-actions>
                <md-button type="button" v-on:click="refresh" class="md-primary md-raised">check</md-button>
              </md-card-actions>
              <div v-if="showHistory && !packageExists" style="text-align: center; color: red;">
                <small>
                  <b>Sorry, we cannot detect a package for your tracking number.</b>
                </small>
              </div>
            </md-card-content>
          </md-card>
        </form>

        <div class="history-container" v-if="showHistory && packageExists">
          <md-card class="md-layout-item md-small-size-100">
            <md-card-header class="history-card-header">
              <div class="md-title">
                <span class="md-title-icon success" v-if="packageDelivered">
                  <i class="material-icons">check</i>
                </span>
                <span class="md-title-icon" v-else>
                  <i class="material-icons">local_shipping</i>
                </span>
                <div class="md-title-label">Package ID {{ keyId }}</div>
              </div>
              <div class="history-progress">
                <div class="history-progress-bar" v-bind:class="{ success: packageDelivered }">
                  <div class="history-progress-bar-element"></div>
                  <div class="history-progress-bar-element"></div>
                </div>
              </div>
              <div v-if="packageDelivered" class="history-status success">Package delivered</div>
              <div v-else class="history-status">Package in transit</div>
              <div class="history-current-owner">Current owner: {{ lastDestination.owner }}</div>
            </md-card-header>
            <md-card-content>
              <div class="timeline">
                <div class="timeline-event" v-for="item in history" v-bind:key="item.txId">
                  <div class="timeline-content">
                    <div class="timeline-content-date">{{ item.date }}</div>
                    <div
                      class="timeline-content-time-destination"
                      v-bind:class="{ success: item.delivered }"
                    >{{ item.time }}</div>
                    <div
                      class="timeline-content-time-destination"
                      v-bind:class="{ success: item.delivered }"
                    >{{ item.owner }}</div>
                  </div>
                  <div v-if="item.delivered" class="timeline-badge success">
                    <i class="material-icons">check</i>
                  </div>
                  <div v-else class="timeline-badge">
                    <i class="material-icons">arrow_upward</i>
                  </div>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </div>
  </layout-default>
</template>

<script>
import LayoutDefault from "../layouts/LayoutDefault.vue";
export default {
  name: `Home`,
  components: {
    LayoutDefault,
  },
  data: () => ({
    history: [],
    keyId: "",
    pId: "",
    packageExists: false,
    packageDelivered: false,
    firstDestination: null,
    lastDestination: null,
    showHistory: false,
  }),
  methods: {
    refresh: async function () {
      if (!this.pId) {
        this.pId = "1";
      }
      this.history = [];
      this.showHistory = false;
      this.packageExists = false;
      this.packageDelivered = false;
      this.firstDestination = null;
      this.lastDestination = null;
      const response = await fetch(
        "https://nb-tracking.samlinux.com/api1/getHistory/" + this.pId
      );
      const tmp = await response.json();

      this.keyId = tmp.key;
      let a = JSON.parse(tmp.value);

      if (a.length > 0) {
        this.packageExists = true;
        a.forEach((element) => {
          let p = {};
          let date = "date not obtained";
          let time = "time not obtained";
          p.txId = element.TxId;
          p.owner = element.Packet.owner;
          p.ts = element.Timestamp;
          if (element.Timestamp && element.Timestamp !== "") {
            const tsSplit = element.Timestamp.split(" ");
            if (tsSplit[0] && tsSplit[0] !== "") {
              date = tsSplit[0];
            }
            if (tsSplit[1] && tsSplit[1] !== "") {
              time = tsSplit[1];
            }
          }
          p.date = date;
          p.time = time;
          if (p.owner === "letter_box") {
            p.delivered = true;
            this.packageDelivered = true;
          }
          if (!this.firstDestination) {
            this.firstDestination = p;
          }
          this.lastDestination = p;
          this.history.unshift(p);
        });
      }
      this.showHistory = true;
    },
  },
};
</script>

<style lang="scss">
.history-container {
  margin-top: 10px;
  .history-card-header {
    position: relative;
    border-bottom: 1px solid #e8e8e8;
    .md-title-icon {
      position: absolute;
      top: 20px;
      left: 16px;
      color: #9a9a9a;
      &.success {
        top: 18px;
        color: rgb(139, 195, 74);
      }
      i {
        font-size: 25px;
        line-height: 40px;
      }
    }
    .md-title-label {
      padding-left: 40px;
    }
    .history-progress {
      .history-progress-bar {
        white-space: nowrap;
        &.success {
          .history-progress-bar-element {
            background: rgb(139, 195, 74) !important;
          }
        }
        .history-progress-bar-element {
          display: inline-block;
          min-width: 50px;
          width: 100%;
          max-width: 90px;
          height: 4px;
          background: #d2d2d2;
          &:first-child {
            margin-right: 3px;
            background: #ffca28;
          }
        }
      }
    }
    .history-status {
    }
    .history-current-owner {
      margin-top: 12px;
    }
  }
}
.timeline {
  position: relative;
  padding: 20px 16px 0 16px;

  .timeline-event {
    position: relative;
    padding-top: 5px;
    padding-bottom: 10px;
    &::after {
      display: block;
      content: "";
      width: 2px;
      height: calc(100% - 46px);
      position: absolute;
      background: #d2d2d2;
      left: 19px;
      top: 50px;
    }
    &:last-child {
      padding-bottom: 0;
      &::after {
        display: none;
      }
      .timeline-content {
        border-bottom: 0;
      }
    }
    .timeline-content {
      position: relative;
      padding: 11px 5px 8px 60px;
      border-bottom: 1px solid #d2d2d2;

      .timeline-content-date {
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 1.2em;
      }
      .timeline-content-time-destination {
        padding-top: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &.success {
          // color: rgb(139, 195, 74);
        }
      }
    }
  }
}

.timeline-badge {
  display: block;
  position: absolute;
  width: 40px;
  height: 40px;
  background: #e0e0e0;
  top: 7px;
  left: 0;
  border-radius: 50%;
  text-align: center;
  cursor: default;

  &.success {
    background: rgb(139, 195, 74);
    color: white;
  }

  i {
    font-size: 25px;
    line-height: 40px;
  }
}
</style>