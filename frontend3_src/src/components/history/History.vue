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
                style="text-align: center; color: red; padding-top: 10px"
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
                        <div class="timeline-content-desc">
                          <span
                            v-if="item.owner === 'freight_forwarder_warehouse'"
                          >
                            Shipments are picked up by freight forwarders and
                            printed cargo labels are applied
                          </span>
                          <span v-if="item.owner === 'truck'">
                            Shipments are handed over to ground handling agents
                          </span>
                          <span v-if="item.owner === 'export_docks'">
                            Shipments are handed over to ground handling agents
                          </span>
                          <span v-if="item.owner === 'storage_location'">
                            Items are collected at HQ
                          </span>
                          <span v-if="item.owner === 'loaded_in_trolley'">
                            Shipments are lodge-in to export dock for freights
                            acceptance
                          </span>
                          <span v-if="item.owner === 'aircraft_bay'">
                            Shipments are verified for weight and security
                          </span>
                          <span v-if="item.owner === 'loaded_into_aircraft'">
                            Shipments are loaded into aircraft container
                          </span>
                          <span v-if="item.owner === 'aircraft_takeoff'">
                            Depart to destination
                          </span>
                        </div>
                      </div>
                      <div class="md-layout-item md-xsmall-size-100">
                        <div class="timeline-img-container">
                          <div
                            class="image-icon freight_forwarder_warehouse"
                            v-if="item.owner === 'freight_forwarder_warehouse'"
                            title="freight_forwarder_warehouse"
                          ></div>
                          <div
                            class="image-icon truck"
                            v-if="item.owner === 'truck'"
                            title="truck"
                          ></div>
                          <div
                            class="image-icon export_docks"
                            v-if="item.owner === 'export_docks'"
                            title="export_docks"
                          ></div>
                          <div
                            class="image-icon storage_location"
                            v-if="item.owner === 'storage_location'"
                            title="storage_location"
                          ></div>
                          <div
                            class="image-icon loaded_in_trolley"
                            v-if="item.owner === 'loaded_in_trolley'"
                            title="loaded_in_trolley"
                          ></div>
                          <div
                            class="image-icon aircraft_bay"
                            v-if="item.owner === 'aircraft_bay'"
                            title="aircraft_bay"
                          ></div>
                          <div
                            class="image-icon loaded_into_aircraft"
                            v-if="item.owner === 'loaded_into_aircraft'"
                            title="loaded_into_aircraft"
                          ></div>
                          <div
                            class="image-icon aircraft_takeoff"
                            v-if="item.owner === 'aircraft_takeoff'"
                            title="aircraft_takeoff"
                          ></div>
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