<template>
  <div class="layout">
    <sidebar />
    <app-bar />
    <app-main />
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { Sidebar, AppBar, AppMain } from './components'

@Component({
  components: { Sidebar, AppBar, AppMain }
})
export default class Layout extends Vue {
}
</script>
