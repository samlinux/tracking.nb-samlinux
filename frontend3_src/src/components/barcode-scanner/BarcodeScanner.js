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
        onBarcodeDecode(result) {
            let scanResult = "";
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
            this.closeDialog(true);
        },
        async onQrInit(promise) {
            try {
                await promise;
                delete this.scannerInitError;
            } catch (error) {
                if (error.name === "NotAllowedError") {
                    this.scannerInitError = "You need to grant camera access permisson";
                } else if (error.name === "NotFoundError") {
                    this.scannerInitError = "No camera available";
                } else if (error.name === "NotReadableError") {
                    this.scannerInitError = "Is the camera already in use?";
                } else if (error.name === "OverconstrainedError") {
                    this.scannerInitError = "Installed cameras are not suitable";
                } else if (error.name === "StreamApiNotSupportedError") {
                    this.scannerInitError =
                        "This browser does not support using this device's camera";
                } else if (
                    ["NotSupportedError", "InsecureContextError"].indexOf(error.name) >= 0
                ) {
                    this.scannerInitError = "Secure context required (HTTPS)";
                } else {
                    this.scannerInitError = "No camera access available";
                }
            }
        },
    },
};