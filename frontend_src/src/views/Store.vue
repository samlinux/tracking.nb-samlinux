<template>
  <layout-default>
    <div class="Store">
      <form class="md-layout" id="app" action="#" method="post">
        <md-card class="md-layout-item md-small-size-100">
          <md-card-header>
            <div class="md-title">Store/update package</div>
          </md-card-header>
          <md-card-content>
            <div class="md-layout-item">
              <md-field :class="packageIdMsgClass">
                <label for="pId">Package ID</label>
                <md-input
                  v-on:keydown.enter.prevent="refresh"
                  name="pId"
                  id="pId"
                  v-model="pId"
                  placeholder="Package ID"
                  required
                  :disabled="transactionInProgress"
                />
              </md-field>
            </div>

            <div class="md-layout-item">
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
  </layout-default>
</template>

<script>
import LayoutDefault from "../layouts/LayoutDefault.vue";
import { API_LOCATION } from "../config/env";
export default {
  name: "Store",
  components: {
    LayoutDefault,
  },
  data: () => ({
    ownerSet: [
      "post_box",
      "post_office",
      "van_delivery_company_a",
      "van_delivery_company_b",
      "van_delivery_company_c",
      "warehouse_a",
      "letter_box",
    ],
    owner: "",
    pId: "",
    response: null,
    formError: null,
    msgTimeout: null,
    checkFormValidity: false,
    transactionInProgress: false,
  }),
  methods: {
    store: async function () {
      if (this.transactionInProgress) return;
      this.response = null;
      this.formError = null;
      if (this.msgTimeout) {
        clearTimeout(this.msgTimeout);
        delete this.msgTimeout;
      }
      if (this.pId && this.pId !== "" && this.owner && this.owner !== "") {
        // Form-Success
        this.checkFormValidity = false;
        this.transactionInProgress = true;
        let payload = { data: { key: this.pId, actor: this.owner } };
        let requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        };
        let ApiResponse = await fetch(API_LOCATION + "store", requestOptions);
        // const responseData = await ApiResponse.json();
        // this.response = "Package history successfully updated: " + responseData.txId;
        await ApiResponse.json();
        this.transactionInProgress = false;
        this.response = "Package history successfully updated.";
        this.msgTimeout = setTimeout(() => {
          this.response = null;
        }, 3000);
        this.owner = "";
        this.pId = "";
      } else {
        // Form-Error
        this.formError = "Package ID and Owner Identity must be set!";
        this.checkFormValidity = true;
      }
    },
    itemLabelTemplate(owner) {
      let itemLabel = "";
      if (owner && owner !== "") {
        itemLabel += owner;
        if (owner === "letter_box") {
          itemLabel += " (package delivered)";
        }
      }
      return itemLabel;
    },
  },
  computed: {
    packageIdMsgClass() {
      const msgClassObj = {};
      if (!(this.pId && this.pId !== "")) {
        msgClassObj["md-invalid"] = this.checkFormValidity;
      }
      return msgClassObj;
    },
    ownerIdMsgClass() {
      const msgClassObj = {};
      if (!(this.owner && this.owner !== "")) {
        msgClassObj["md-invalid"] = this.checkFormValidity;
      }
      return msgClassObj;
    },
  },
};
</script>

<style lang="scss">
.response {
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
  &.response-success {
    color: rgb(139, 195, 74);
  }
  &.response-error {
    color: red;
  }
}
.rq-spinner-container {
  float: right;
  height: 36px;
}
</style>