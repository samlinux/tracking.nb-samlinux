import LayoutDefault from "../../layouts/LayoutDefault.vue";
import { API_LOCATION } from "../../config/env";
export default {
    name: "Store",
    components: {
        LayoutDefault,
    },
    data: () => ({
        ownerSet: [
            'freight_forwarder_warehouse', 'truck', 'export_docks', 'storage_location',
            'loaded_in_trolley', 'aircraft_bay', 'loaded_into_aircraft', 'aircraft_takeoff'
        ],
        owner: "",
        pId: "",
        response: null,
        formError: null,
        msgTimeout: null,
        checkFormValidity: false,
        transactionInProgress: false,
        showQrScanner: false,
        rfidSet: []
    }),
    methods: {
        onQrDecode(result) {
            if (result && result !== "") {
                this.pId = result;
            } else {
                this.pId = "";
            }
        },
        itemLabelTemplate(owner) {
            let itemLabel = "";
            if (owner && owner !== "") {
                itemLabel += owner;
                /* if (owner === "letter_box") {
                    itemLabel += " (package delivered)";
                } */
            }
            return itemLabel;
        },
        getRfidSet: function (searchTerm) {
            this.rfidSet = new Promise(resolve => {
                resolve(this.fetchFoundRfidData(searchTerm));
            });
        },
        fetchFoundRfidData: async function (searchTerm) {
            let data = [];
            if (!searchTerm || searchTerm === "") {
                return data;
            }
            const payload = { data: { key: searchTerm } };
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            };
            const ApiResponse = await fetch(API_LOCATION + "search", requestOptions);
            const responseData = await ApiResponse.json();
            // this.response = "Package history successfully updated: " + responseData.txId;
            console.log(responseData);
            return data;
        },
        store: async function () {
            if (this.transactionInProgress) return;
            let rfid;
            if (this.pId) {
                if (this.pId.rfid) {
                    rfid = this.pId.rfid;
                }
            }
            this.response = null;
            this.formError = null;
            if (this.msgTimeout) {
                clearTimeout(this.msgTimeout);
                delete this.msgTimeout;
            }
            if (rfid && this.owner && this.owner !== "") {
                // Form-Success
                this.checkFormValidity = false;
                this.transactionInProgress = true;
                const payload = { data: { key: rfid, actor: this.owner } };
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                };
                const ApiResponse = await fetch(API_LOCATION + "store", requestOptions);
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
        }
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