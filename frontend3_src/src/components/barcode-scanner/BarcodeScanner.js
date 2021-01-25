export default {
    name: "BarcodeScanner",
    props: {
        openDialog: Boolean,
    },
    watch: {
        openDialog: function () {
            this.open();
        },
    },
    components: {},
    data: () => ({
        scanResult: "",
        scannerInitError: null,
        showDialog: false,
        readerSize: {
            width: 640,
            height: 480
        }
    }),
    methods: {
        open() {
            this.showDialog = true;
        },
        closeDialog(scanSuccess) {
            if (scanSuccess) {
                this.$emit("barcodeScanned", this.scanResult);
            }
            this.showDialog = false;
        },
        onBarcodeDecode(data) {
            console.log('detected', data);
            /* let scanResult = "";
            if (result && result !== "") {
                if (result.indexOf("pid=") >= 0) {
                    const resultSplit = result.split("pid=");
                    if (resultSplit[1] && resultSplit[1] !== "") {
                        scanResult = resultSplit[1];
                    }
                }
                if (scanResult === "") {
                    scanResult = result;
                }
            }
            this.scanResult = scanResult;
            this.closeDialog(true); */
        }
    },
};