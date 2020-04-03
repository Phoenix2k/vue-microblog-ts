<template lang="html">
  <div>
    <notifications
      animation-name="v-fade-bottom"
      class="ajax-success"
      group="ajax-success"
      position="bottom center"
      :duration="notificationDuration"
      :width="320"
    >
      <template slot="body" slot-scope="props">
        <div class="notification-template">
          <div class="notification-icon">
            <svg class="icon icon-cloud-checkmark"><use xlink:href="#icon-cloud-checkmark" /></svg>
          </div>
          <div class="notification-content">
            <div class="notification-title" v-html="props.item.title"></div>
            <div class="notification-text" v-html="props.item.text"></div>
          </div>
          <div class="notification-close" @click="props.close">
            <svg class="icon icon-cross"><use xlink:href="#icon-cross" /></svg>
          </div>
        </div>
      </template>
    </notifications>
    <notifications
      animation-name="v-fade-bottom"
      class="ajax-error"
      group="ajax-error"
      position="bottom center"
      :duration="notificationDuration"
      :width="320"
    >
      <template slot="body" slot-scope="props">
        <div class="notification-template">
          <div class="notification-icon">
            <svg class="icon icon-database-remove"><use xlink:href="#icon-database-remove" /></svg>
          </div>
          <div class="notification-content">
            <div class="notification-title" v-html="props.item.title"></div>
            <div class="notification-text" v-html="props.item.text"></div>
          </div>
          <div class="notification-close" @click="props.close">
            <svg class="icon icon-cross"><use xlink:href="#icon-cross" /></svg>
          </div>
        </div>
      </template>
    </notifications>
    <notifications
      animation-name="v-fade-bottom"
      class="ajax-success"
      group="post-deleted"
      position="bottom center"
      :duration="notificationDuration"
      :width="320"
    >
      <template slot="body" slot-scope="props">
        <div class="notification-template">
          <div class="notification-icon">
            <svg class="icon icon-file-minus"><use xlink:href="#icon-file-minus" /></svg>
          </div>
          <div class="notification-content">
            <div class="notification-title" v-html="props.item.title"></div>
            <div class="notification-text" v-html="props.item.text"></div>
          </div>
          <div class="notification-close" @click="props.close">
            <svg class="icon icon-cross"><use xlink:href="#icon-cross" /></svg>
          </div>
        </div>
      </template>
    </notifications>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NotificationTemplates extends Vue {
  @Prop({ default: 1500 }) private notificationDuration!: number;
}
</script>
