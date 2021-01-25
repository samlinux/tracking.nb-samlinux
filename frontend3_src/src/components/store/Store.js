import moment from 'moment';
import LayoutDefault from "../../layouts/LayoutDefault.vue";
import { API_LOCATION } from "../../config/env";
export default {
    name: "Store",
    components: {
        LayoutDefault,
    },
    data: () => ({
        backToSearch: false,
        cropKey: null,
        cropData: null,
        seedData: {},
        farmerDetail: {},
        farmerDetailActive: false,
        inputDetail: {},
        inputDetailActive: false,
        fpoName: "",
        cropName: "",
        cropDate: null,
        cropId: "",
        response: null,
        formError: null,
        seedResponse: null,
        seedFormError: null,
        farmerFormError: null,
        inputFormError: null,
        msgTimeout: null,
        eventTarget: false,
        checkFormValidity: false,
        transactionInProgress: false,
        dialogTransactionInProgress: false
    }),
    created: async function () {
        // Date-Format
        this.$material.locale.dateFormat = 'dd/MM/yyyy';
    },
    mounted() {
        let hasTmpData = false;
        const routerData = this.$route.params;
        if (routerData) {
            if (routerData.cropData) {
                const tmpKey = routerData.cropData.key,
                    tmpSeedData = routerData.cropData.seedData;
                delete routerData.cropData.key;
                delete routerData.cropData.seedData;
                if (tmpKey) {
                    this.cropData = routerData.cropData;
                    this.seedData = tmpSeedData ? tmpSeedData : {};
                    this.cropKey = tmpKey;
                    hasTmpData = true;
                }
            }
        }
        if (!hasTmpData) {
            // delete temp. search-data
            localStorage.removeItem('search-data');
        } else {
            this.backToSearch = true;
        }
        window.addCustomEventListener("navStore", this.resetCropDetailData);
    },
    destroyed() {
        window.removeCustomEventListener("navStore", this.resetCropDetailData);
    },
    methods: {
        loadCrop: async function (cropKey) {
            const payload = {
                data: {
                    key: cropKey
                }
            };
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            };
            const ApiResponse = await fetch(API_LOCATION + "getCrop", requestOptions);
            const responseData = await ApiResponse.json();
            if (responseData) {
                if (responseData.value) {
                    this.cropData = {
                        barCode: null,
                        fpoName: responseData.value.FpoName,
                        cropName: responseData.value.CropName,
                        cropDate: new Date(responseData.value.CropDate),
                        cropId: responseData.value.CropId
                    };
                    const farmers = [],
                        inputs = [];
                    if (responseData.value.Farmer) {
                        responseData.value.Farmer.forEach((element) => {
                            if (element.Name && element.Name !== '') {
                                element.index = farmers.length;
                                farmers.push(element);
                            }
                        });
                    }
                    if (responseData.value.Inputs) {
                        responseData.value.Inputs.forEach((element) => {
                            if (element.Name && element.Name !== '') {
                                element.index = inputs.length;
                                inputs.push(element);
                            }
                        });
                    }
                    this.cropData.farmer = farmers;
                    this.cropData.inputs = inputs;
                    if (responseData.value.Seed) {
                        let seedDate = null;
                        if (responseData.value.Seed.SeedDate) {
                            seedDate = new Date(responseData.value.Seed.SeedDate);
                            if (seedDate.getFullYear() < 1900) {
                                seedDate = null;
                            }
                        }
                        this.seedData = {
                            cropName2: responseData.value.Seed.CropName,
                            cropVarityName: responseData.value.Seed.CropVarityName,
                            purchasedFrom: responseData.value.Seed.PurchasedFrom,
                            seedDate: seedDate
                        };
                    }
                    this.cropKey = cropKey;
                }
            }
        },
        storeCrop: async function () {
            if (this.transactionInProgress) return;
            this.response = null;
            this.formError = null;
            if (this.fpoName && this.cropName && this.cropDate && this.cropDate && this.cropId) {
                // Form-Success
                this.transactionInProgress = true;
                const payload = {
                    data: {
                        fpoName: this.fpoName,
                        cropName: this.cropName,
                        cropDate: this.cropDate.toISOString(),
                        cropId: this.cropId
                    }
                };
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                };
                const ApiResponse = await fetch(API_LOCATION + "createCrop", requestOptions);
                const responseData = await ApiResponse.json();
                this.transactionInProgress = false;
                if (responseData.key) {
                    this.response = null;
                    this.cropData = {
                        barCode: responseData.barcode,
                        fpoName: this.fpoName,
                        cropName: this.cropName,
                        cropDate: this.cropDate,
                        cropId: this.cropId,
                        farmer: [],
                        inputs: []
                    };
                    this.cropKey = responseData.key;
                    this.fpoName = '';
                    this.cropName = '';
                    this.cropDate = null;
                    this.cropId = '';
                } else {
                    // Form-Error
                    this.formError = "A crop with the given has been created already!";
                }
            } else {
                // Form-Error
                this.formError = "Every field must be filled out!";
            }
        },
        storeSeed: async function () {
            if (this.transactionInProgress) return;
            this.seedResponse = null;
            this.seedFormError = null;
            if (this.msgTimeout) {
                clearTimeout(this.msgTimeout);
                delete this.msgTimeout;
            }
            if (this.seedData.cropName2 && this.seedData.cropVarityName && this.seedData.purchasedFrom && this.seedData.seedDate) {
                // Form-Success
                this.transactionInProgress = true;
                const payload = {
                    data: {
                        key: this.cropKey,
                        cropName2: this.seedData.cropName2,
                        cropVarityName: this.seedData.cropVarityName,
                        seedDate: this.seedData.seedDate.toISOString(),
                        purchasedFrom: this.seedData.purchasedFrom
                    }
                };
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                };
                const ApiResponse = await fetch(API_LOCATION + "setSeed", requestOptions);
                await ApiResponse.json();
                this.transactionInProgress = false;
                this.seedResponse = "Seed data was set successfully.";
                this.msgTimeout = setTimeout(() => {
                    this.seedResponse = null;
                }, 4500);

            } else {
                // Form-Error
                this.seedFormError = "Every field must be filled out!";
            }
        },
        storeFarmer: async function () {
            if (this.dialogTransactionInProgress) return;
            this.farmerFormError = null;
            if (this.farmerDetail.farmerName && this.farmerDetail.farmerAddress) {
                // Form-Success
                this.dialogTransactionInProgress = true;
                const payload = {
                    data: {
                        key: this.cropKey,
                        farmerName: this.farmerDetail.farmerName,
                        farmerAddress: this.farmerDetail.farmerAddress
                    }
                };
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                };
                const ApiResponse = await fetch(API_LOCATION + "addFarmer", requestOptions);
                await ApiResponse.json();
                this.dialogTransactionInProgress = false;
                // set Farmer-Data into Farmers Array
                if (this.cropData) {
                    if (!this.cropData.farmer) {
                        this.cropData.farmer = [];
                    }
                    this.cropData.farmer.push({
                        Name: this.farmerDetail.farmerName,
                        Address: this.farmerDetail.farmerAddress,
                        index: this.cropData.farmer.length
                    });
                }
                // close modal
                this.farmerDetailActive = false;
            } else {
                // Form-Error
                this.farmerFormError = "Every field must be filled out!";
            }
        },
        openFarmerDialog: function () {
            this.farmerDetail = {};
            this.farmerFormError = null;
            this.farmerDetailActive = true;
        },
        storeInput: async function () {
            if (this.dialogTransactionInProgress) return;
            this.inputFormError = null;
            if (this.inputDetail.inputName && this.inputDetail.inputType && this.inputDetail.inputPurchasedFrom && this.inputDetail.inputDate) {
                // Form-Success
                this.dialogTransactionInProgress = true;
                const payload = {
                    data: {
                        key: this.cropKey,
                        inputName: this.inputDetail.inputName,
                        inputType: this.inputDetail.inputType,
                        inputPurchasedFrom: this.inputDetail.inputPurchasedFrom,
                        inputDate: this.inputDetail.inputDate.toISOString()
                    }
                };
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                };
                const ApiResponse = await fetch(API_LOCATION + "addInputs", requestOptions);
                await ApiResponse.json();
                this.dialogTransactionInProgress = false;
                // set Farmer-Data into Farmers Array
                if (this.cropData) {
                    if (!this.cropData.inputs) {
                        this.cropData.inputs = [];
                    }
                    this.cropData.inputs.push({
                        Name: this.inputDetail.inputName,
                        Type: this.inputDetail.inputType,
                        PurchasedFrom: this.inputDetail.inputPurchasedFrom,
                        InputDate: this.inputDetail.inputDate,
                        index: this.cropData.inputs.length
                    });
                }
                // close modal
                this.inputDetailActive = false;
            } else {
                // Form-Error
                this.inputFormError = "Every field must be filled out!";
            }
        },
        openInputDialog: function () {
            this.inputDetail = {};
            this.inputFormError = null;
            this.inputDetailActive = true;
        },
        goBack: function () {
            if (this.backToSearch) {
                this.$router.push({
                    name: "history"
                });
            } else {
                this.resetCropDetailData();
            }
        },
        resetCropDetailData: function () {
            this.cropData = null;
            this.seedData = null;
            this.seedData = {};
            this.cropKey = null;
        },
        showCropImage: function (img, cropName) {
            let showImg = false,
                hasBanana = false,
                hasApple = false,
                hasPear = false,
                tmpName = '';
            if (cropName && cropName !== '') {
                tmpName = cropName.toLowerCase();
            }
            if (tmpName.indexOf("banan") >= 0) {
                hasBanana = true;
            }
            if (tmpName.indexOf("apple") >= 0 || tmpName.indexOf("apfel") >= 0) {
                hasApple = true;
            }
            if (tmpName.indexOf("pear") >= 0 || tmpName.indexOf("birne") >= 0) {
                hasPear = true;
            }
            if (img === 'banana') {
                if (hasBanana && !hasApple && !hasPear) {
                    showImg = true;
                }
            } else if (img === 'pear') {
                if (!hasBanana && !hasApple && hasPear) {
                    showImg = true;
                }
            } else if (img === 'apple') {
                if (!hasBanana && !hasPear) {
                    showImg = true;
                }
            }
            return showImg;
        },
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('DD/MM/YYYY')
            }
            return '';
        }
    },
    computed: {
        validationFpoMsgClass() {
            const msgClassObj = {};
            if (this.checkFormValidity) {
                if (!this.fpoName) {
                    // msgClassObj["md-invalid"] = this.checkFormValidity;
                }
            }
            return msgClassObj;
        }
    },
};