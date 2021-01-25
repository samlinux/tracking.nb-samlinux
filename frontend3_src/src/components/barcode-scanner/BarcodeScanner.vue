<template>
  <md-dialog
    class="scan-barcode-dialog"
    :md-fullscreen="false"
    :md-active.sync="showDialog"
  >
    <md-dialog-title>Scan crop barcode</md-dialog-title>
    <md-dialog-content class="barcode-dialog-container">
      <div
        class="barcode-scanner"
        v-bind:class="{ 'no-camera-available': scannerInitError }"
      >
        <v-quagga
          :onDetected="onBarcodeDecode"
          :readerSize="readerSize"
        ></v-quagga>
        <div v-if="scannerInitError" class="qr-init-error">
          Error: No camera available or missing permissions!
        </div>
      </div>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click="closeDialog()">Close</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script src="./BarcodeScanner.js"></script>
<style src="./BarcodeScanner.scss" lang="scss" scoped></style>