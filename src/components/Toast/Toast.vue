<template>
  <v-snackbar
    :timeout="timeout"
    :color="color"
    :bottom="y === 'bottom'"
    :top="y === 'top'"
    :left="x === 'left'"
    :right="x === 'right'"
    :multi-line = "multiLine"
    :vertical = "vertical"
    v-model="active"
    class="v-application vts"
    :class="classes"
    @click="dismiss"
    role="alert"
  >
    <v-icon
      dark
      left
      v-if="!!icon"
      class="vts__icon"
      :color="iconColor"
    >
      {{ icon }}
    </v-icon>

    <div
      class="vts__message"
      :class="{ 'vts__message--padded': showClose && !closeText }"
    >
      <div v-html="message"></div>
      <slot></slot>
    </div>

    <v-btn
      :icon="!closeText"
      :text="!!closeText"
      class="vts__close"
      :class="{ 'vts__close--icon': !closeText }"
      :color="closeColor"
      v-if="showClose"
      @click="close"
    >
      <v-icon v-if="!closeText">{{ closeIcon }}</v-icon>
      <span v-if="!!closeText">{{ closeText }}</span>
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Toast extends Vue {
  @Prop({ type: String, default: '' }) readonly x!: string
  @Prop({ type: String, default: 'top' }) readonly y!: string
  @Prop({ type: String, default: 'info' }) readonly color!: string
  @Prop({ type: String, default: '' }) readonly icon!: string
  @Prop({ type: String, default: '' }) readonly iconColor!: string
  @Prop({ type: [String, Object, Array], default: '' }) readonly classes!: any
  @Prop({ type: String, default: '' }) readonly message!: string
  @Prop({ type: Number, default: 1500 }) readonly timeout!: number
  @Prop({ type: Boolean, default: true }) readonly dismissable!: boolean
  @Prop({ type: Boolean, default: false }) readonly multiLine!: boolean
  @Prop({ type: Boolean, default: false }) readonly vertical!: boolean
  @Prop({ type: Boolean, default: false }) readonly showClose!: boolean
  @Prop({ type: String, default: '' }) readonly closeText!: string
  @Prop({ type: String, default: 'close' }) readonly closeIcon!: string
  @Prop({ type: String, default: '' }) readonly closeColor!: string

  mounted () {
    this.$nextTick(() => this.show())
  }

  private active: boolean = false
  @Watch('active')
  onActiveChange (isActive: boolean, wasActive: boolean) {
    this.$emit('statusChange', isActive, wasActive)
  }

  show () {
    this.active = true
  }

  close () {
    this.active = false
  }

  dismiss () {
    if (this.dismissable) this.close()
  }
}
</script>

<style>
  .vts {
    max-width: none !important;
    width: auto !important;
  }

  .vts .v-snack__content {
    justify-content: flex-start;
  }

  .vts__icon {
    margin-right: 12px;
  }

  .vts__message {
    margin-right: auto;
  }

  .vts__close {
    margin: 0 -8px 0 24px !important;
    justify-self: flex-end;
  }

  .vts.v-snack--vertical .vts__icon {
    margin: 0 0 12px !important;
  }

  .vts.v-snack--vertical .v-snack__content {
    padding-bottom: 16px !important;
  }

  .vts.v-snack--vertical .vts__message--padded {
    padding: 12px 0 0;
  }

  .vts.v-snack--vertical .vts__icon + .vts__message {
    padding-top: 0;
  }

  .vts.v-snack--vertical .vts__close {
    margin: 12px 0 -8px !important;
  }

  .vts.v-snack--vertical .vts__close--icon {
    margin: 0 !important;
    position: absolute;
    right: 4px;
    top: 4px;
    transform: scale(0.75);
    padding: 4px !important;
  }
</style>
