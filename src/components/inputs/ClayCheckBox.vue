<script lang="ts" setup>
    import FontAwesome from "../core/FontAwesome.vue";

    defineProps({
        id: {
            type: String,
            required: true
        }
    });
</script>

<template>
    <div class="clay-checkbox">
        <input :id="id"
               type="checkbox"
               class="clay-checkbox__input" />
        <span class="clay-checkbox__checkmark">
            <FontAwesome icon="check" />
        </span>
    </div>
</template>

<style lang="scss">
    @use "@/assets/scss/mixins";
    @use "@/assets/scss/functions";

    :root
    {
        --clay-checkbox-color-off: oklch(from var(--clay-light-color) calc(l - 0.15) c h);
        --clay-checkbox-color-on: var(--clay-primary-color);
        --clay-checkbox-color-outline: oklch(from var(--clay-primary-color) l c calc(h + 180));
        --clay-checkbox-color-shadow: oklch(from var(--black) calc(l - 0.25) c h);

        --clay-checkbox-size: 1.5em;
        --clay-checkbox-roundness: 0.375em;
    }

    .clay-checkbox
    {
        display: inline-block;
        height: var(--clay-checkbox-size);
        position: relative;
        width: var(--clay-checkbox-size);

        .clay-checkbox__input
        {
            cursor: pointer;
            inset: 0;
            margin: 0;
            opacity: 0;
            position: absolute;
            height: 100%;
            width: 100%;
            z-index: 1;
        }

        .clay-checkbox__checkmark
        {
            align-items: center;
            background-color: var(--clay-checkbox-color-off);
            background-image: linear-gradient(rgba(from var(--white) r g b / 0.25),
                                              rgba(from var(--black) r g b / 0.125));

            background-blend-mode: overlay;
            border-radius: var(--clay-checkbox-roundness);
            inset: 0;
            pointer-events: none;
            position: absolute;
            transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                        box-shadow var(--clay-ease-duration) var(--clay-ease-function),
                        transform var(--clay-ease-duration) var(--clay-ease-function);
            .fa
            {
                color: var(--white);
                opacity: 0;
                transition: opacity var(--clay-ease-duration) var(--clay-ease-function),
                            transform var(--clay-ease-duration) var(--clay-ease-function);

                transform: scale(0.5);
            }
            @include mixins.clay-shadow-elevation($color: var(--clay-checkbox-color-shadow), $intensity: 0.25);
            z-index: 0;

            &::before
            {
                @include mixins.clay-shadow-puff($intensity: 0.125);

                border-radius: var(--clay-checkbox-roundness);
                content: "";
                inset: 0;
                mix-blend-mode: luminosity;
                position: absolute;
                z-index: -1;
            }

        }

        .clay-checkbox__input:checked + .clay-checkbox__checkmark
        {
            background-color: var(--clay-checkbox-color-on);

            .fa
            {
                opacity: 1;
                transform: scale(1);
            }
        }

        .clay-checkbox__input:focus-visible + .clay-checkbox__checkmark
        {
            box-shadow: functions.clay-outline($color: var(--clay-checkbox-color-outline), $width: 0.15em),
                        0 0.25em 0.25em 0 rgba(from var(--clay-checkbox-color-shadow) r g b / 0.333);

            transform: translateY(-0.075em) scale(1.1);
        }

        .clay-checkbox__input:hover + .clay-checkbox__checkmark
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
