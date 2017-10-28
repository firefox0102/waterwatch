import moment from 'moment'
import Vue from 'vue'

Vue.filter('formatDate', function (value) {
  console.log('filter')
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
})
