<script lang="ts" setup></script>

<template>
    <div class="clay-toast">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @use "@/assets/scss/mixins";

    :root
    {
        --clay-toast-color-background: var(--clay-primary-color);

        --clay-toast-spacing-x: 1em;
        --clay-toast-spacing-y: 0.75em;
        --clay-toast-spacing: var(--clay-toast-spacing-y) var(--clay-toast-spacing-x);

        --clay-toast-roundness: 1em;
    }

    .clay-toast
    {
        @include mixins.clay-shadow-elevation($intensity: 0.5);

        background-color: var(--clay-toast-color-background);
        background-image: linear-gradient(rgba(from var(--white) r g b / 0.25), rgba(from var(--black) r g b / 0.125));
        background-blend-mode: overlay;
        border-radius: var(--clay-toast-roundness);
        color: contrast-color(var(--clay-toast-color-background));

        display: inline-flex;
        inline-size: fit-content;
        z-index: 0;
        max-inline-size: min(24em, 100%);
        padding: var(--clay-toast-spacing);
        position: relative;
        text-align: start;
        transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                    box-shadow var(--clay-ease-duration) var(--clay-ease-function),
                    color var(--clay-ease-duration) var(--clay-ease-function);

        &::before
        {
            @include mixins.clay-shadow-puff($intensity: 0.5, $color: var(--clay-toast-color-shadow));

            border-radius: var(--clay-toast-roundness);
            content: "";
            inset: 0;
            mix-blend-mode: multiply;
            position: absolute;
            transition: box-shadow var(--clay-ease-duration) var(--clay-ease-function);
            z-index: 1;
        }
    }

    @media (prefers-color-scheme: dark)
    {
        :root
        {
            --clay-toast-color-background: var(--clay-dark-color);
            --clay-toast-color-shadow: var(--black);
        }

        .clay-toast
        {
            @include mixins.clay-shadow-elevation($color: var(--clay-toast-color-shadow), $intensity: 0.75);

            &::before
            {
                @include mixins.clay-shadow-puff($color: var(--clay-toast-color-shadow), $intensity: 0.5);
            }
        }
    }
</style>
