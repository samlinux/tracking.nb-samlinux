export default {
    name: "QrCodeScanner",
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
        qrInitError: null,
        showDialog: false,
    }),
    methods: {
        open() {
            this.showDialog = true;
        },
        closeDialog(scanSuccess) {
            if (scanSuccess) {
                this.$emit("qrCodeScanned", this.scanResult);
            }
            this.showDialog = false;
        },
        onQrDecode(result) {
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
                delete this.qrInitError;
            } catch (error) {
                if (error.name === "NotAllowedError") {
                    this.qrInitError = "You need to grant camera access permisson";
                } else if (error.name === "NotFoundError") {
                    this.qrInitError = "No camera available";
                } else if (error.name === "NotReadableError") {
                    this.qrInitError = "Is the camera already in use?";
                } else if (error.name === "OverconstrainedError") {
                    this.qrInitError = "Installed cameras are not suitable";
                } else if (error.name === "StreamApiNotSupportedError") {
                    this.qrInitError =
                        "This browser does not support using this device's camera";
                } else if (
                    ["NotSupportedError", "InsecureContextError"].indexOf(error.name) >= 0
                ) {
                    this.qrInitError = "Secure context required (HTTPS)";
                } else {
                    this.qrInitError = "No camera access available";
                }
            }
        },
    },
};