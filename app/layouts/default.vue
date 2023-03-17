<template>
  <main :class="[$route.name]" class="main">
    <Map></Map>
    <AuthForm></AuthForm>

    <!--
    <div class="container mx-auto">
      <site-header />
    </div>
    -->

    <nuxt class="nuxt" />

    <!--
    <svg class="divider -mx-4 sm:mx-0" width="100%" viewBox="0 0 10 1">
      <polygon stroke="none" stroke-width="0" fill="#0b3765" points="0,0.6 0,1 10,1 10,0" />
    </svg>

    <site-footer />-->
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import SiteHeader from '@/components/partials/header.vue';
import SiteFooter from '@/components/partials/footer.vue';
import Map from '@/components/commons/map.vue';
import AuthForm from '@/components/commons/auth-form.vue';

@Component({
  components: {
    SiteHeader,
    SiteFooter,
    Map,
    AuthForm
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss">
.divider {
  position: relative;
  min-width: 100vw;
  margin-top: auto;
}

.nuxt {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
</style>
