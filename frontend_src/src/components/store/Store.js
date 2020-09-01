import LayoutDefault from "../../layouts/LayoutDefault.vue";
import { API_LOCATION } from "../../config/env";
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
        showQrScanner: false,
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
                if (owner === "letter_box") {
                    itemLabel += " (package delivered)";
                }
            }
            return itemLabel;
        },
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