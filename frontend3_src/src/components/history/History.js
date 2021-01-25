import moment from 'moment';
import LayoutDefault from "../../layouts/LayoutDefault.vue";
import { API_LOCATION } from "../../config/env";
export default {
    name: "History",
    components: {
        LayoutDefault,
    },
    data: () => ({
        barcodeKey: null,
        searchResult: [],
        filterData: {},
        formError: null,
        showTracing: false,
        transactionInProgress: false,
        showBarcodeScanner: false
    }),
    mounted: function () {
        // here we go...
        const tmpSearchData = localStorage.getItem('search-data');
        if (tmpSearchData) {
            try {
                const tmpFilterData = JSON.parse(tmpSearchData);
                if (tmpFilterData.fpoName) {
                    this.filterData = tmpFilterData;
                    this.searchData();
                }
            } catch (e) {
                // do nothing...
            }
        }
    },
    methods: {
        onBarcodeDecode: async function (result) {
            if (result && result > 0) {
                const payload = {
                    data: {
                        barcode: result.toString()
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
                    if (responseData.key) {
                        if (responseData.key !== "noKey") {
                            this.openKeyDetail(responseData.key, true);
                        }
                    }
                }
            }
        },
        searchData: async function () {
            this.searchResult = [];
            this.showTracing = false;
            this.formError = null;
            if (this.filterData.fpoName && this.filterData.fpoName !== '') {
                this.transactionInProgress = true;
                let isArray = true;
                let reqRoute = 'getCropByFpo';
                let payload;
                payload = {
                    fpoName: this.filterData.fpoName
                };
                if (this.filterData.cropName && this.filterData.cropName !== '') {
                    reqRoute = 'getCropByFpoCrop';
                    payload.cropName = this.filterData.cropName;
                }
                if (this.filterData.cropYear && this.filterData.cropYear !== '') {
                    reqRoute = 'getCropByFpoCropYear';
                    payload.cropYear = this.filterData.cropYear;
                }
                if (this.filterData.cropId && this.filterData.cropId !== '') {
                    reqRoute = 'getCrop';
                    payload = {
                        key: this.filterData.fpoName + '~' + this.filterData.cropName + '~' +
                            this.filterData.cropYear + '~' + this.filterData.cropId
                    };
                    isArray = false;
                }
                payload = {
                    data: payload
                };

                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                };
                const ApiResponse = await fetch(API_LOCATION + reqRoute, requestOptions);
                const response = await ApiResponse.json();
                let searchResult = [];
                if (response) {
                    if (!response.r) {
                        if (response.length > 0) {
                            response.forEach((element) => {
                                if (element.Key && element.Value) {
                                    element.Value.Key = element.Key;
                                    element.Value.CropId = this.cropIdTemplate(element.Value);
                                    searchResult.push(element.Value);
                                }
                            });
                        }
                    }
                }
                if (!isArray && response.key && response.key !== 'noKey') {
                    this.openKeyDetail(response.key);
                } else {
                    this.transactionInProgress = false;
                    this.searchResult = searchResult;
                    this.showTracing = true;
                    localStorage.setItem("search-data", JSON.stringify(this.filterData));
                }
            } else {
                this.formError = 'At least the FPO name must be set to search for a crop.';
            }
        },
        fpoChanged() {
            if (!this.filterData.fpoName || this.filterData.fpoName === '') {
                this.filterData.cropName = '';
                this.filterData.cropYear = '';
                this.filterData.cropId = '';
            }
        },
        nameChanged() {
            if (!this.filterData.cropName || this.filterData.cropName === '') {
                this.filterData.cropYear = '';
                this.filterData.cropId = '';
            }
        },
        yearChanged() {
            if (!this.filterData.cropYear || this.filterData.cropYear === '') {
                this.filterData.cropId = '';
            }
        },
        cropIdTemplate(data) {
            let value = '';
            if (data) {
                if (data.Key) {
                    const tmpSplit = data.Key.split('~');
                    if (tmpSplit.length > 0) {
                        value = tmpSplit[(tmpSplit.length - 1)];
                    }
                }
            }
            return value;
        },
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('YYYY')
            }
            return '';
        },
        openKeyDetail: async function (cropKey, readMode) {
            if (cropKey) {
                this.transactionInProgress = true;
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
                this.transactionInProgress = false;
                if (responseData) {
                    if (responseData.value) {
                        let cropData;
                        cropData = {
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
                        cropData.farmer = farmers;
                        cropData.inputs = inputs;
                        cropData.key = cropKey;
                        cropData.seedData = {};
                        if (responseData.value.Seed) {
                            let seedDate = null;
                            if (responseData.value.Seed.SeedDate) {
                                seedDate = new Date(responseData.value.Seed.SeedDate);
                                if (seedDate.getFullYear() < 1900) {
                                    seedDate = null;
                                }
                            }
                            cropData.seedData = {
                                cropName2: responseData.value.Seed.CropName,
                                cropVarityName: responseData.value.Seed.CropVarityName,
                                purchasedFrom: responseData.value.Seed.PurchasedFrom,
                                seedDate: seedDate
                            };
                        }
                        if (readMode) {
                            cropData.readMode = true;
                        }
                        this.$router.push({
                            name: "store",
                            params: { cropData }
                        });
                    }
                }
            }
        }
    },
};