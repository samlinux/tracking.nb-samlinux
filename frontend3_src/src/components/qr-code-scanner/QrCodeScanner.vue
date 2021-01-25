<template>
  <md-dialog class="scan-qr-dialog" :md-fullscreen="false" :md-active.sync="showDialog">
    <md-dialog-title>Scan QR package ID</md-dialog-title>
    <md-dialog-content class="qr-dialog-container">
      <div class="qr-code-scanner" v-bind:class="{ 'no-camera-available': qrInitError }">
        <qrcode-stream class="qr-code-stream" @decode="onQrDecode" @init="onQrInit"></qrcode-stream>
        <div v-if="qrInitError" class="qr-init-error">Error: {{ qrInitError }}!</div>
      </div>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click="closeDialog()">Close</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script src="./QrCodeScanner.js"></script>
<style src="./QrCodeScanner.scss" lang="scss" scoped></style>