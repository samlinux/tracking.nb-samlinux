<template>
  <layout-default>
    <div class="history">
      <div>
        <form novalidate class="md-layout" id="app" action="#" method="post">
          <md-card class="md-layout-item md-small-size-100">
            <md-card-header>
              <div class="md-title">Package History</div>
            </md-card-header>
            <md-card-content>
              <label for="pId">Package ID</label>
              <md-field>
                <md-input
                  v-on:keydown.enter.prevent="refresh"
                  name="pId"
                  id="pId"
                  v-model="pId"
                />
                <!-- <md-button
                  class="md-icon-button"
                  style="margin: 0;"
                  @click="showQrScanner = !showQrScanner;"
                >
                  <md-icon>qr_code_scanner</md-icon>
                </md-button>-->
              </md-field>
              <md-card-actions>
                <md-button
                  type="button"
                  v-on:click="refresh"
                  class="md-primary md-raised"
                  >check</md-button
                >
              </md-card-actions>
              <div
                v-if="showHistory && !packageExists"
                style="text-align: center; color: #e9943f"
              >
                <small>
                  <b
                    >Sorry, we cannot detect a package with the given package
                    ID.</b
                  >
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
                <div class="md-title-label">PID {{ keyId }}</div>
              </div>
              <div class="history-progress">
                <div
                  class="history-progress-bar"
                  v-bind:class="{ success: packageDelivered }"
                >
                  <div class="history-progress-bar-element"></div>
                  <div class="history-progress-bar-element"></div>
                </div>
              </div>
              <div v-if="packageDelivered" class="history-status success">
                Package delivered
              </div>
              <div v-else class="history-status">Package in transit</div>
              <div class="history-current-owner">
                Current owner: {{ lastDestination.owner }}
              </div>
            </md-card-header>
            <md-card-content>
              <div class="timeline">
                <div
                  class="timeline-event"
                  v-for="item in history"
                  v-bind:key="item.txId"
                >
                  <div class="timeline-content">
                    <div class="md-layout">
                      <div class="md-layout-item md-xsmall-size-100">
                        <div class="timeline-content-date">{{ item.date }}</div>
                        <div
                          class="timeline-content-time-destination"
                          v-bind:class="{ success: item.delivered }"
                        >
                          {{ item.time }}
                        </div>
                        <div
                          class="timeline-content-time-destination"
                          v-bind:class="{ success: item.delivered }"
                        >
                          {{ item.owner }}
                        </div>
                      </div>
                      <div class="md-layout-item md-xsmall-size-100">
                        <div class="timeline-img-container">
                          <img
                            v-if="item.owner === 'freight_forwarder_warehouse'"
                            src="../../assets/images/icons/freight_forwarder_warehouse.png"
                            alt="freight_forwarder_warehouse"
                          />
                          <img
                            v-if="item.owner === 'truck'"
                            src="../../assets/images/icons/truck.png"
                            alt="truck"
                          />
                          <img
                            v-if="item.owner === 'export_docks'"
                            src="../../assets/images/icons/export_docks.png"
                            alt="export_docks"
                          />
                          <img
                            v-if="item.owner === 'storage_location'"
                            src="../../assets/images/icons/storage_location.png"
                            alt="storage_location"
                          />
                          <img
                            v-if="item.owner === 'loaded_in_trolley'"
                            src="../../assets/images/icons/loaded_in_trolley.png"
                            alt="loaded_in_trolley"
                          />
                          <img
                            v-if="item.owner === 'aircraft_bay'"
                            src="../../assets/images/icons/aircraft_bay.png"
                            alt="aircraft_bay"
                          />
                          <img
                            v-if="item.owner === 'loaded_into_aircraft'"
                            src="../../assets/images/icons/loaded_into_aircraft.png"
                            alt="loaded_into_aircraft"
                          />
                          <img
                            v-if="item.owner === 'aircraft_takeoff'"
                            src="../../assets/images/icons/aircraft_takeoff.png"
                            alt="aircraft_takeoff"
                          />
                        </div>
                      </div>
                    </div>
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
    <!-- Component: QrCodeScanner -->
    <QrCodeScanner
      v-bind:openDialog="showQrScanner"
      v-on:qrCodeScanned="onQrDecode"
    />
  </layout-default>
</template>

<script src="./History.js"></script>
<style src="./History.scss" lang="scss" scoped></style>