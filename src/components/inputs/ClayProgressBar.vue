<script setup lang="ts">
    defineProps({
        progress: {
            type: Number,
            default: 0,
            validator: (value: number) => value >= 0 && value <= 100
        }
    });
</script>

<template>
    <label class="clay-progress-bar" :style="{ '--_w': `${progress}%` }">
        <span class="clay-progress-bar__track">
            <span class="clay-progress-bar__indicator" :style="{ width: `${progress}%` }"></span>
        </span>
    </label>
</template>

<style lang="scss">
    @use "@/assets/scss/mixins";
    @use "@/assets/scss/functions";

    :root
    {
        --clay-progress-bar-background-color: oklch(from var(--clay-light-color) calc(l - 0.15) c h);
        --clay-progress-bar-indicator-color: var(--clay-primary-color);
        --clay-progress-bar-indicator-color-shadow-background:
            inset 0 0.25em 0.25em 0 rgba(from var(--black) r g b / 0.125);
        --clay-progress-bar-shadow-color: var(--black);

        --clay-border-radius: 0.35rem;
        --clay-progress-bar-height: 0.75rem;
    }

    .clay-progress-bar // contenitore
    {
        display: block;
        position: relative;
        width: 100%;
        height: var(--clay-progress-bar-height);
        border-radius: var(--clay-border-radius);
        z-index: 0;

        &::after // ombra della progress bar
        {
            border-radius: var(--clay-border-radius);
            bottom: 0;
            content: "";
            left: 0;
            pointer-events: none;
            position: absolute;
            top: 0;
            transition: width 0.1s ease;
            width: var(--_w, 0%);
            z-index: 1;
            @include mixins.clay-shadow-elevation($intensity: 1);
        }

        &__track // background dove la progress bar si muove
        {
            background-color: var(--clay-progress-bar-background-color);
            border-radius: var(--clay-border-radius);
            bottom: 0;
            box-shadow: var(--clay-progress-bar-indicator-color-shadow-background);
            left: 0;
            overflow: hidden;
            position: absolute;
            right: 0;
            top: 0;
        }

        &__indicator
        {
            display: block;
            align-items: center;
            position: absolute;
            height: 100%;
            background-color: var(--clay-progress-bar-indicator-color);
            transition: width 0.1s ease;
            border-radius: var(--clay-border-radius);
            z-index: 0;

        &::before
                {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: var(--clay-border-radius);
                    @include mixins.clay-shadow-puff($intensity: 0.25);
                    z-index: -1;
                }
        }
    }

    @media (prefers-color-scheme: dark)
    {
        :root
        {
            --clay-progress-bar-background-color: oklch(from var(--clay-light-color) calc(l - 0.35) c h);
            --clay-progress-bar-indicator-color-shadow-background:
                inset 0 0.25em 0.25em 0 rgba(from var(--black) r g b / 0.15);
            // --clay-progress-bar-shadow-color: oklch(from var(--white) calc(l - 0.35) c h);
        }
    }
</style>
