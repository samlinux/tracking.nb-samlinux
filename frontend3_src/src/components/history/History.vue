<template>
  <layout-default>
    <div class="trace-view">
      <div v-if="transactionInProgress" class="trace-view-locked"></div>
      <div>
        <form novalidate class="md-layout" id="app" action="#" method="post">
          <md-card class="md-layout-item md-small-size-100">
            <md-card-header>
              <div class="md-title">Trace crop</div>
            </md-card-header>
            <md-card-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-xsmall-size-100 md-small-size-50">
                  <md-field>
                    <label>FPO name</label>
                    <md-input
                      v-model="filterData.fpoName"
                      v-on:input="fpoChanged"
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-xsmall-size-100 md-small-size-50">
                  <md-field v-if="filterData.fpoName">
                    <label>Crop name</label>
                    <md-input
                      v-model="filterData.cropName"
                      v-on:input="nameChanged"
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-xsmall-size-100 md-small-size-50">
                  <md-field v-if="filterData.cropName">
                    <label>Year</label>
                    <md-input
                      v-model="filterData.cropYear"
                      v-on:input="yearChanged"
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-xsmall-size-100 md-small-size-50">
                  <md-field v-if="filterData.cropYear">
                    <label>Crop ID</label>
                    <md-input v-model="filterData.cropId"></md-input>
                  </md-field>
                </div>
              </div>
              <div class="response response-error" v-if="formError">
                {{ formError }}
              </div>
              <div
                class="response response-error"
                v-if="showTracing && searchResult.length === 0"
              >
                <b>No crop was found.</b>
              </div>
              <md-card-actions>
                <div v-if="transactionInProgress" class="rq-spinner-container">
                  <md-progress-spinner
                    md-mode="indeterminate"
                    :md-diameter="30"
                    :md-stroke="3"
                  ></md-progress-spinner>
                </div>
                <md-button
                  v-if="!transactionInProgress"
                  type="button"
                  v-on:click="searchData"
                  class="md-accent md-raised"
                  >Search</md-button
                >
              </md-card-actions>
            </md-card-content>
          </md-card>
        </form>
      </div>
      <!-- Table -->
      <div
        class="crop-list-container"
        v-if="showTracing && searchResult.length > 0"
      >
        <md-table
          v-model="searchResult"
          md-sort="CropName"
          md-sort-order="asc"
          md-card
        >
          <md-table-toolbar>
            <h1 class="md-title">Search result</h1>
          </md-table-toolbar>

          <md-table-row
            slot="md-table-row"
            slot-scope="{ item }"
            @click="openKeyDetail(item.Key)"
          >
            <md-table-cell md-label="FPO name" md-sort-by="FpoName">{{
              item.FpoName
            }}</md-table-cell>
            <md-table-cell md-label="Crop name" md-sort-by="CropName">{{
              item.CropName
            }}</md-table-cell>
            <md-table-cell md-label="Date" md-sort-by="CropDate">{{
              formatDate(item.CropDate)
            }}</md-table-cell>
            <md-table-cell md-label="Crop ID" md-sort-by="CropId">{{
              item.CropId
            }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
  </layout-default>
</template>

<script src="./History.js"></script>
<style src="./History.scss" lang="scss" scoped></style>