<template>
  <div class="LayoutDefault">
    <main class="LayoutDefault__main">
      <slot />
    </main>
  </div>
</template>

<script>
export default {
  name: `LayoutDefault`,
  data: () => ({}),
  created() {},
};
</script>

<style lang="scss">
.LayoutDefault {
  max-width: 42em;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1em;
  padding-left: 1em;

  &__nav {
    padding-top: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid #c0c0c0;
  }

  &__user {
    float: right;
  }

  &__main {
    padding-top: 1.5em;
    padding-bottom: 2em;
  }

  &__footer {
    padding-top: 1em;
    padding-bottom: 1em;
    border-top: 1px solid #c0c0c0;
  }
}
</style>

