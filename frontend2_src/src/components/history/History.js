import LayoutDefault from "../../layouts/LayoutDefault.vue";
import { API_LOCATION } from "../../config/env";
export default {
    name: "History",
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
        showQrScanner: false,
    }),
    mounted: function () {
        if (this.$route.path) {
            if (this.$route.path.indexOf("showHistory") >= 0) {
                if (this.$route.query.pid && this.$route.query.pid !== "") {
                    this.pId = this.$route.query.pid;
                    this.refresh();
                }
            }
        }
    },
    methods: {
        onQrDecode(result) {
            if (result && result !== "") {
                this.pId = result;
            } else {
                this.pId = "";
            }
            this.refresh();
        },
        refresh: async function () {
            this.history = [];
            this.showHistory = false;
            this.packageExists = false;
            this.packageDelivered = false;
            this.firstDestination = null;
            this.lastDestination = null;
            if (this.pId && this.pId !== "") {
                const response = await fetch(API_LOCATION + "getHistory/" + this.pId);
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
            }
            this.showHistory = true;
        },
    },
};