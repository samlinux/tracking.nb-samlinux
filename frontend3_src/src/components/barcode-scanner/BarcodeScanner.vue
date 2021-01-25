<template>
  <md-dialog
    class="scan-qr-dialog"
    :md-fullscreen="false"
    :md-active.sync="showDialog"
  >
    <md-dialog-title>Scan QR package ID</md-dialog-title>
    <md-dialog-content class="qr-dialog-container">
      <div
        class="barcode-scanner"
        v-bind:class="{ 'no-camera-available': scannerInitError }"
      >
        <qrcode-stream
          class="qr-code-stream"
          @decode="onBarcodeDecode"
          @init="onQrInit"
        ></qrcode-stream>
        <div v-if="scannerInitError" class="qr-init-error">
          Error: {{ scannerInitError }}!
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