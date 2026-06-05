<script lang="ts">
</script>

<template>
    <label class="clay-checkbox">
        <input type="checkbox" class="clay-checkbox__input" />
        <span class="clay-checkbox__checkmark"></span>
    </label>
</template>

<style lang="scss">
    @use "@/assets/scss/mixins";
    @use "@/assets/scss/functions";

    :root
    {
        --clay-checkbox-color-off: oklch(from var(--clay-light-color) calc(l - 0.15) c h);
        --clay-checkbox-color-on: var(--clay-primary-color);
        --clay-checkbox-color-shadow: oklch(from var(--black) calc(l - 0.25) c h);
    }
</style>
