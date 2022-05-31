<template>
  <q-page class="flex flex-center">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    > -->
    <h2 class="text-blue">WELCOME TO DASHBOARD</h2>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  created () {
    this.alert('Welcome to Dashboard')
  },
  methods: {
    alert (message) {
     this.$q.notify({
            color: 'positive',
            message: message,
            icon: 'home',
            position: 'top',
          })
    }
  },
})
</script>
