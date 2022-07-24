<template>
    <div>
        <b-table :striped="striped"
         :borderless="borderless"
         :bordered="bordered"
         :items=this.items
        >
        </b-table>
    </div>
</template>

<script>

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

export default{
  props: {
    items: {}
  },
  data () {
    return {
      striped: true,
      borderless: false,
      bordered: true
    }
  }
}
</script>
