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
        closeDialog(scannedValue) {
            if (scannedValue && !isNaN(parseInt(scannedValue))) {
                this.$emit("barcodeScanned", parseInt(scannedValue));
            }
            this.showDialog = false;
        },
        onBarcodeDecode(data) {
            if (data) {
                if (data.codeResult) {
                    if (data.codeResult.code) {
                        if (!isNaN(parseInt(data.codeResult.code))) {
                            this.closeDialog(data.codeResult.code);
                        }
                    }
                }
            }
        }
    },
};