<template>
  <div class="count-to">
    {{ endValue }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import anime from 'animejs'

@Component
export default class CountTo extends Vue {
  @Prop({ type: [String, Number], required: true }) endValue?: string | number
  @Prop({ type: Boolean }) decimals?: boolean
  @Prop({ type: Boolean }) showPoint?: boolean

  @Watch('endValue')
  onEndValueChange (newValue: string | number, oldValue: string | number) {
    const myObject: { prop: string | number } = { prop: Number(oldValue) }
    anime({
      targets: myObject,
      prop: Number(newValue),
      easing: 'linear',
      round: this.showPoint ? 100 : 1,
      update: () => {
        if (this.decimals) {
          let data = myObject.prop
          data = +data < 10 ? ('0' + String(data)) : data
          this.$el.innerHTML = String(data)
        } else {
          const data = this.showPoint ? Number(myObject.prop).toFixed(2) : myObject.prop
          this.$el.innerHTML = String(data)
        }
      }
    })
  }
}
</script>

<style lang="less" scoped>
.count-to {
  display: inline-block;
}
</style>
