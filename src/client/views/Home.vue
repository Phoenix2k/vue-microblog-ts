<template lang="html">
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>News Feed</h1>
    <news-feed />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NewsFeed from '../components/NewsFeed.vue';

@Component({
  components: {
    'news-feed': NewsFeed
  }
})
export default class Home extends Vue {
  private created() {
    console.log('Home view created');
  }
}
</script>
