<template>
  <div>videos</div>
</template>

<script>
import { getMVrank, MVdata } from 'common/api/discover'
export default {
  name: 'videos',
  mounted () {
    this._getMVrank()
  },
  methods: {
    _getMVrank () {
      getMVrank(10).then(res => {
        console.log(res)
      })
      MVdata(10865787).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
