<template>
  <layout-default>
    <div class="Store">
      <!-- Crop Form -->
      <div v-if="!cropKey" class="store-crop">
        <form class="md-layout" id="create-crop-form">
          <md-card class="md-layout-item md-small-size-100">
            <md-card-header>
              <div class="md-title">Create a crop</div>
            </md-card-header>
            <md-card-content>
              <div>
                <md-field :class="validationFpoMsgClass">
                  <label>FPO name</label>
                  <md-input v-model="fpoName"></md-input>
                </md-field>
              </div>
              <div>
                <md-field>
                  <label>Crop name</label>
                  <md-input v-model="cropName"></md-input>
                </md-field>
              </div>
              <div>
                <md-datepicker v-model="cropDate" md-immediately
                  ><label>Crop date</label>
                </md-datepicker>
              </div>
              <div>
                <md-field>
                  <label>Crop ID</label>
                  <md-input v-model="cropId"></md-input>
                </md-field>
              </div>
              <md-card-actions>
                <div v-if="transactionInProgress" class="rq-spinner-container">
                  <md-progress-spinner
                    md-mode="indeterminate"
                    :md-diameter="30"
                    :md-stroke="3"
                  ></md-progress-spinner>
                </div>
                <md-button
                  v-else
                  type="button"
                  v-on:click="storeCrop"
                  class="md-accent md-raised"
                  >Store</md-button
                >
              </md-card-actions>
              <div class="response response-success" v-if="response">
                {{ response }}
              </div>
              <div class="response response-error" v-if="formError">
                {{ formError }}
              </div>
            </md-card-content>
          </md-card>
        </form>
      </div>
      <!-- Crop Detail -->
      <div v-if="cropKey" class="store-sub-data md-layout md-gutter">
        <div v-if="transactionInProgress" class="store-sub-data-locked"></div>
        <div class="md-layout-item md-medium-size-50 md-small-size-100">
          <div class="crop-detail-container">
            <md-card>
              <md-card-header>
                <div class="md-title">Crop</div>
              </md-card-header>
              <md-card-content>
                <div class="crop-image-container">
                  <img
                    v-if="showCropImage('apple', cropData.cropName)"
                    src="../../assets/images/apples.png"
                  />
                  <img
                    v-if="showCropImage('pear', cropData.cropName)"
                    src="../../assets/images/pears.png"
                  />
                  <img
                    v-if="showCropImage('banana', cropData.cropName)"
                    src="../../assets/images/bananas.png"
                  />
                </div>
                <md-list>
                  <md-list-item>
                    <md-icon>people</md-icon>
                    <div class="md-list-item-text">
                      <span>{{ cropData.fpoName }}</span>
                      <span>FPO</span>
                    </div>
                  </md-list-item>
                  <md-list-item>
                    <md-icon>grass</md-icon>
                    <div class="md-list-item-text">
                      <span>{{ cropData.cropName }}</span>
                      <span>Crop</span>
                    </div>
                  </md-list-item>
                  <md-list-item>
                    <md-icon>calendar_today</md-icon>
                    <div class="md-list-item-text">
                      <span>{{ formatDate(cropData.cropDate) }}</span>
                      <span>Date</span>
                    </div>
                  </md-list-item>
                </md-list>
              </md-card-content>
            </md-card>
          </div>
          <div class="farmer-list-container">
            <md-card>
              <md-card-header>
                <div class="md-title">
                  <md-button
                    @click="openFarmerDialog()"
                    class="md-icon-button md-raised md-plain list-add-btn"
                  >
                    <md-icon>add</md-icon>
                  </md-button>
                  Farmers
                </div>
              </md-card-header>
              <md-card-content>
                <md-list v-if="cropData.farmer && cropData.farmer.length > 0">
                  <md-list-item
                    v-for="farmer in cropData.farmer"
                    :key="farmer.index"
                  >
                    <md-icon>person</md-icon>
                    <div class="md-list-item-text">
                      <span>{{ farmer.Name }}</span>
                      <span>{{ farmer.Address }}</span>
                    </div>
                  </md-list-item>
                </md-list>
                <div v-if="!(cropData.farmer && cropData.farmer.length > 0)">
                  No farmers created yet.
                </div>
              </md-card-content>
            </md-card>
          </div>
        </div>
        <div class="md-layout-item md-medium-size-50 md-small-size-100">
          <div class="seed-detail-container">
            <md-card>
              <md-card-header>
                <div class="md-title">Seed</div>
              </md-card-header>
              <md-card-content>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-xsmall-size-100">
                    <md-field>
                      <label>Seed name</label>
                      <md-input v-model="seedData.cropName2"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-xsmall-size-100">
                    <md-field>
                      <label>Varity name</label>
                      <md-input v-model="seedData.cropVarityName"></md-input>
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-xsmall-size-100">
                    <md-field>
                      <label>Purchased from</label>
                      <md-input v-model="seedData.purchasedFrom"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-xsmall-size-100">
                    <md-datepicker v-model="seedData.seedDate" md-immediately
                      ><label>Seed date</label>
                    </md-datepicker>
                  </div>
                </div>
              </md-card-content>
              <md-card-actions>
                <div v-if="transactionInProgress" class="rq-spinner-container">
                  <md-progress-spinner
                    md-mode="indeterminate"
                    :md-diameter="30"
                    :md-stroke="3"
                  ></md-progress-spinner>
                </div>
                <md-button
                  v-else
                  type="button"
                  v-on:click="storeSeed"
                  class="md-accent md-raised"
                  >Store</md-button
                >
              </md-card-actions>
              <div class="response-container">
                <div v-if="seedResponse" class="response response-success">
                  {{ seedResponse }}
                </div>
                <div v-if="seedFormError" class="response response-error">
                  {{ seedFormError }}
                </div>
              </div>
            </md-card>
          </div>
          <div class="inputs-list-container">
            <md-card>
              <md-card-header>
                <div class="md-title">
                  <md-button
                    @click="openInputDialog()"
                    class="md-icon-button md-raised md-plain list-add-btn"
                  >
                    <md-icon>add</md-icon>
                  </md-button>
                  Inputs
                </div>
              </md-card-header>
              <md-card-content>
                <md-list v-if="cropData.inputs && cropData.inputs.length > 0">
                  <md-list-item
                    v-for="input in cropData.inputs"
                    :key="input.index"
                  >
                    <md-icon>pest_control</md-icon>
                    <div class="md-list-item-text">
                      <span
                        >{{ input.Name }}
                        <span class="row-date-val">
                          {{ formatDate(input.InputDate) }}
                        </span>
                      </span>
                      <span>{{ input.PurchasedFrom }}</span>
                      <span>{{ input.Type }}</span>
                    </div>
                  </md-list-item>
                </md-list>
                <div v-if="!(cropData.inputs && cropData.inputs.length > 0)">
                  No inputs created yet.
                </div>
              </md-card-content>
            </md-card>
          </div>
        </div>
      </div>

      <!-- Dialog - Farmer -->
      <md-dialog
        :md-active.sync="farmerDetailActive"
        :md-close-on-esc="false"
        :md-click-outside-to-close="false"
      >
        <md-dialog-title>Add farmer</md-dialog-title>

        <div
          v-if="dialogTransactionInProgress"
          class="dialog-data-locked"
        ></div>

        <md-dialog-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>Name</label>
                <md-input v-model="farmerDetail.farmerName"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>Address</label>
                <md-input v-model="farmerDetail.farmerAddress"></md-input>
              </md-field>
            </div>
          </div>
          <div class="response-container">
            <p
              v-if="farmerFormError"
              class="response response-error"
              style="margin-bottom: 0 !important; margin-top: 10px !important"
            >
              {{ farmerFormError }}
            </p>
          </div>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button
            style="float: left"
            class="md-raised"
            @click="farmerDetailActive = false"
            >Cancel</md-button
          >
          <md-button
            v-if="!dialogTransactionInProgress"
            class="md-raised md-primary"
            @click="storeFarmer()"
            >Add</md-button
          >
          <div v-if="dialogTransactionInProgress" class="rq-spinner-container">
            <md-progress-spinner
              md-mode="indeterminate"
              :md-diameter="30"
              :md-stroke="3"
            ></md-progress-spinner>
          </div>
        </md-dialog-actions>
      </md-dialog>

      <!-- Dialog - Input -->
      <md-dialog
        :md-active.sync="inputDetailActive"
        :md-close-on-esc="false"
        :md-click-outside-to-close="false"
      >
        <md-dialog-title>Add input</md-dialog-title>

        <div
          v-if="dialogTransactionInProgress"
          class="dialog-data-locked"
        ></div>

        <md-dialog-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-xsmall-size-100">
              <md-field>
                <label>Name</label>
                <md-input v-model="inputDetail.inputName"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-xsmall-size-100">
              <md-field>
                <label>Type</label>
                <md-input v-model="inputDetail.inputType"></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-xsmall-size-100">
              <md-field>
                <label>Purchased from</label>
                <md-input v-model="inputDetail.inputPurchasedFrom"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-xsmall-size-100">
              <md-datepicker v-model="inputDetail.inputDate" md-immediately
                ><label>Date</label>
              </md-datepicker>
            </div>
          </div>
          <div class="response-container">
            <p
              v-if="inputFormError"
              class="response response-error"
              style="margin-bottom: 0 !important; margin-top: 10px !important"
            >
              {{ inputFormError }}
            </p>
          </div>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button
            style="float: left"
            class="md-raised"
            @click="inputDetailActive = false"
            >Cancel</md-button
          >
          <md-button
            v-if="!dialogTransactionInProgress"
            class="md-raised md-primary"
            @click="storeInput()"
            >Add</md-button
          >
          <div v-if="dialogTransactionInProgress" class="rq-spinner-container">
            <md-progress-spinner
              md-mode="indeterminate"
              :md-diameter="30"
              :md-stroke="3"
            ></md-progress-spinner>
          </div>
        </md-dialog-actions>
      </md-dialog>
    </div>
  </layout-default>
</template>

<script src="./Store.js"></script>
<style src="./Store.scss" lang="scss" scoped></style>