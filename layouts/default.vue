<template>
  <div class="layout">
    <header class="layout__header">
      <TheNavbar />
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <TheFooter />
    </footer>
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;

  &__header {
    position: sticky;
    top: 0;
    backdrop-filter: blur(10px);
  }
}
</style>