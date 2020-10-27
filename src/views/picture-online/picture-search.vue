<template>
  <div class="picture-search">
    <v-row class="search-box" align="end" >
      <v-col cols="12" sm="6" md="4" lg="4" xl="4">
        <v-text-field
          label="流水号"
          hideDetails
          clearable
          v-model.trim="seachOrderNum"
          @keyup.native.enter="seachData"
        />
      </v-col>
      <v-col
        cols="12" class="button-box"
        sm="4" md="4" lg="4" xl="4"
      >
        <v-btn class="search-box" color="primary" @click="seachData">查询</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PictureSearch extends Vue {
  private seachOrderNum: string = 'T2020102479945646'

  seachData () {
    console.log('查询')
  }
  
}
</script>

<style lang="less" scoped>
.no-padding {
  padding: 0;
}

.search-box {
  margin-left: auto;
}
</style>
