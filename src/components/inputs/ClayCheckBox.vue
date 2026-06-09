<script lang="ts" setup>
    import FontAwesome from "../core/FontAwesome.vue";
</script>

<template>
    <label class="clay-checkbox">
        <input type="checkbox" class="clay-checkbox__input" />
        <span class="clay-checkbox__checkmark">
            <FontAwesome icon="check" />
        </span>
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
        --clay-checkbox-color-outline: oklch(from var(--clay-primary-color) l c calc(h + 180));

        --clay-checkbox-size: 1.5em;
        --clay-checkbox-roundness: 0.375em;
    }

    .clay-checkbox
    {
        cursor: pointer;
        display: inline-block;
        height: var(--clay-checkbox-size);
        position: relative;
        width: var(--clay-checkbox-size);

        .clay-checkbox__input // mantiene l'input nativo però è nascosto visivamente.
        {
            height: 0;
            opacity: 0;
            position: absolute;
            width: 0;
        }

        .clay-checkbox__checkmark // la mai checkbox personalizzata.
        {
            background-color: var(--clay-checkbox-color-off);
            background-image: linear-gradient(rgba(from var(--white) r g b / 0.25),
            rgba(from var(--black) r g b / 0.125));
            background-blend-mode: overlay;
            border-radius: var(--clay-checkbox-roundness);
            bottom: 0;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                        box-shadow var(--clay-ease-duration) var(--clay-ease-function),
                        transform var(--clay-ease-duration) var(--clay-ease-function);
            z-index: 0;
            @include mixins.clay-shadow-elevation($color: var(--clay-checkbox-color-shadow), $intensity: 0.25);

            &::before
            {
                border-radius: var(--clay-checkbox-roundness);
                bottom: 0;

                @include mixins.clay-shadow-puff($intensity: 0.125);

                content: "";
                left: 0;
                mix-blend-mode: luminosity;
                position: absolute;
                right: 0;
                top: 0;

                z-index: -1;
            }

        }

        .clay-checkbox__input:checked + .clay-checkbox__checkmark
        {
            background-color: var(--clay-checkbox-color-on);
        }

        .clay-checkbox__input:focus-visible + .clay-checkbox__checkmark
        {
            box-shadow: functions.clay-outline($color: var(--clay-checkbox-color-outline), $width: 0.15em),
                        0 0.25em 0.25em 0 rgba(from var(--clay-checkbox-color-shadow) r g b / 0.333);

            transform: translateY(-0.0625em) scale(1.1);
        }

        &:hover .clay-checkbox__checkmark
        {
            @include mixins.clay-shadow-elevation($color: var(--clay-checkbox-color-shadow), $intensity: 0.5);
        }
    }

    @media (prefers-color-scheme: dark)
    {
        :root
        {
            --clay-checkbox-color-shadow: oklch(from var(--black) calc(l - 0.25) c h);
            --clay-checkbox-color-off: oklch(from var(--clay-light-color) calc(l - 0.35) c h);
        }

        .clay-checkbox .clay-checkbox__checkmark
        {
        @include mixins.clay-shadow-elevation($color: var(--clay-checkbox-color-shadow), $intensity: 0.25);

            &::before
            {
                @include mixins.clay-shadow-puff($intensity: 0.5);
            }
        }
    }
</style>
