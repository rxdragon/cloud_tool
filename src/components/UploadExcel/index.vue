<template>
  <div>
    <input
      ref="excel-upload-input"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleClick"
    >
    <v-btn :loading="loading" @click="handleUpload">{{ btnText }}</v-btn>
  </div>
</template>

<script lang="ts">
import XLSX from 'xlsx'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class UploadExcel extends Vue {
  @Prop({ type: Function }) beforeUpload?: Function
  @Prop({ type: Function }) onSuccess?: Function
  @Prop({ type: String, default: '上传表格' }) btnText!: string
  @Prop({ type: Array, default: [] }) headerData!: []

  private loading: boolean = false
  private excelData: { header: any, results: any } = {
    header: null,
    results: null
  }

  generateData (header: any, results: any) {
    this.excelData.header = header
    this.excelData.results = results
    this.onSuccess && this.onSuccess(this.excelData)
  }

  handleUpload () {
    (this.$refs['excel-upload-input'] as HTMLInputElement).click()
  }

  handleClick (e: MouseEvent) {
    const files = (e.target as HTMLInputElement).files
    if (files) {
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    }
  }

  /**
   * @description 上传文件
   */
  upload (rawFile: File) {
    (this.$refs['excel-upload-input'] as HTMLInputElement).value = '' // Fixes can't select the same excel
    if (!this.beforeUpload) {
      this.readerData(rawFile)
      return
    }
    const before = this.beforeUpload(rawFile)
    if (before) {
      this.readerData(rawFile)
    }
  }

  /**
   * @description 读取文件
   */
  readerData (rawFile: File) {
    this.loading = true
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const header = this.getHeaderRow(worksheet)
        const opt = this.headerData ? { header: this.headerData } : {}
        const results = XLSX.utils.sheet_to_json(worksheet, opt)
        this.generateData(header, results)
        this.loading = false
        resolve()
      }
      reader.readAsArrayBuffer(rawFile)
    })
  }

  getHeaderRow (sheet: { [key: string ]: any }) {
    const headers = []
    const range = XLSX.utils.decode_range(sheet['!ref'])
    let C
    const R = range.s.r
    /* start in the first row */
    for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
      const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
      /* find the cell in the first row */
      let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
      if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
      headers.push(hdr)
    }
    return headers
  }

  isExcel (file: File) {
    return /\.(xlsx|xls|csv)$/.test(file.name)
  }
}
</script>

<style scoped>
.excel-upload-input {
  z-index: -9999;
  display: none;
}

.drop {
  position: relative;
  width: 600px;
  height: 160px;
  margin: 0 auto;
  font-size: 24px;
  line-height: 160px;
  color: #bbb;
  text-align: center;
  border: 2px dashed #bbb;
  border-radius: 5px;
}
</style>
