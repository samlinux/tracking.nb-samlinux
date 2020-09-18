<template>
  <layout-default>
    <div class="Store">
      <form class="md-layout" id="app" action="#" method="post">
        <md-card class="md-layout-item md-small-size-100">
          <md-card-header>
            <div class="md-title">Store/update package</div>
          </md-card-header>
          <md-card-content>
            <div>
              <md-autocomplete
                placeholder="Package ID"
                v-on:keydown.enter.prevent="refresh"
                v-model="pId"
                :md-options="rfidSet"
                @md-changed="getRfidSet"
                @md-opened="getRfidSet"
                required
                :disabled="transactionInProgress"
                v-bind:class="{'has-error': formError && !pId.rfid}"
              >
                <label>Package ID</label>
                <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.rfid }}</template>
                <template slot="md-autocomplete-empty" slot-scope="{ term }">
                  <span>No package with ID matching "{{ term }}" was found.</span>
                </template>
                <div v-if="pId.rfid" class="md-helper-text">
                  <strong>Selected ID:</strong>
                  <span class="package-id-selected">{{ pId.rfid }}</span>
                </div>
                <div
                  v-else
                  class="md-helper-text"
                  v-bind:class="{'has-error': formError && !pId.rfid}"
                >
                  <strong>Please select an existing Package ID.</strong>
                </div>
              </md-autocomplete>
            </div>

            <div style="margin-top: 35px;">
              <md-field :class="ownerIdMsgClass">
                <label for="owner">Owner Identity</label>
                <md-select
                  v-model="owner"
                  name="owner"
                  id="owner"
                  placeholder="Owner Identity"
                  required
                  :disabled="transactionInProgress"
                >
                  <md-option disabled name value>Please select owner identity</md-option>
                  <md-option
                    v-for="item in ownerSet"
                    v-bind:key="item"
                    :value="item"
                  >{{ itemLabelTemplate(item) }}</md-option>
                </md-select>
              </md-field>
            </div>
            <md-card-actions>
              <div v-if="transactionInProgress" class="rq-spinner-container">
                <md-progress-spinner md-mode="indeterminate" :md-diameter="30" :md-stroke="3"></md-progress-spinner>
              </div>
              <md-button v-else type="button" v-on:click="store" class="md-primary md-raised">send</md-button>
            </md-card-actions>
            <div class="response response-success" v-if="response">{{ response }}</div>
            <div class="response response-error" v-if="formError">{{ formError }}</div>
          </md-card-content>
        </md-card>
      </form>
    </div>
    <!-- Component: QrCodeScanner -->
    <QrCodeScanner v-bind:openDialog="showQrScanner" v-on:qrCodeScanned="onQrDecode" />
  </layout-default>
</template>

<script src="./Store.js"></script>
<style src="./Store.scss" lang="scss" scoped></style>