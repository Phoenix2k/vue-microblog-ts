<template lang="html">
  <div class="admin">
    <h1>Admin</h1>
    <post-form />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CreatePost from '../components/CreatePost.vue';

@Component({
  components: {
    'post-form': CreatePost
  }
})
export default class Admin extends Vue {
  private created() {
    console.info('Admin loaded');
  }
}
</script>
