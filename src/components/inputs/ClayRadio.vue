<script setup lang="ts">
    import { computed } from "vue";

    // A native radio can't be unchecked without JS, so this control is a checkbox:
    // it toggles on/off entirely via the browser, working with JavaScript disabled.
    const model = defineModel({
        type: String,
        default: ""
    });

    const props = defineProps({
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        small: {
            type: Boolean,
            default: false
        },
        large: {
            type: Boolean,
            default: false
        }
    });

    const classes = computed((): Record<string, boolean> => ({
        "clay-radio--small": props.small,
        "clay-radio--large": props.large,
        "clay-radio--disabled": props.disabled
    }));
</script>

<template>
    <label class="clay-radio"
           :class="classes"
           :for="id">
        <input :id="id"
               v-model="model"
               class="clay-radio__input"
               type="radio"
               :name="name"
               :value="value"
               :disabled="disabled" />

        <span class="clay-radio__control"></span>
    </label>
</template>

<style lang="scss">
    @use "@/assets/scss/functions";
    @use "@/assets/scss/mixins";

    @layer clay-radio
    {
        :root
        {
            --clay-radio-color-background: oklch(from var(--clay-light-color) calc(l + 0.075) c h);
            --clay-radio-color-fill: var(--clay-primary-color);
            --clay-radio-color-outline: oklch(from var(--clay-primary-color) l c calc(h + 180));
            --clay-radio-color-shadow: oklch(from var(--clay-primary-color) calc(l - 0.25) c h);

            --clay-radio-size: 1.5em;
        }

        .clay-radio // tutto il componente
        {
            align-items: center;
            cursor: pointer;
            display: inline-flex;
            font-size: 1em;
            margin: 0;

            &__input
            {
                height: 1px;
                margin: 0;
                opacity: 0;
                position: absolute;
                width: 1px;
            }

            &__control // cerchio
            {
                background-color: var(--clay-radio-color-background);
                background-image: linear-gradient(rgba(from var(--black) r g b / 0.125),
                                                  rgba(from var(--white) r g b / 0.25));
                background-blend-mode: overlay;
                border-radius: 50%;
                box-shadow: functions.clay-outline($color: var(--clay-radio-color-outline), $opacity: 0),
                            inset 0 -0.075em 0.125em 0 rgba(from var(--white) r g b / 0.5),
                            inset 0 0.125em 0.25em 0 rgba(from var(--clay-radio-color-shadow) r g b / 0.35);
                flex: none;
                height: var(--clay-radio-size);
                position: relative;
                transition: box-shadow var(--clay-ease-duration) var(--clay-ease-function),
                            transform var(--clay-ease-duration) var(--clay-ease-function);
                width: var(--clay-radio-size);

                &::before,
                &::after
                {
                    border-radius: 50%;
                    content: "";
                    height: 50%;
                    left: 50%;
                    position: absolute;
                    top: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    width: 50%;
                }

                &::before // pallina dentro
                {
                    background-color: var(--clay-radio-color-fill);
                    background-blend-mode: overlay;

                    @include mixins.clay-shadow-puff($color: var(--clay-radio-color-shadow), $intensity: 0.5);

                    transition: transform var(--clay-ease-duration) var(--clay-ease-function);

                    z-index: 1;
                }

                &::after //solo ombra pallina elevazione
                {
                    @include mixins.clay-shadow-elevation($intensity: 0.25);

                    transition: box-shadow var(--clay-ease-duration) var(--clay-ease-function),
                                transform var(--clay-ease-duration) var(--clay-ease-function);
                }
            }

            &:hover &__input:not(:checked) + &__control
            {
                box-shadow: functions.clay-outline($color: var(--clay-radio-color-outline), $opacity: 0),
                            inset 0 -0.075em 0.125em 0 rgba(from var(--white) r g b / 0.3),
                            inset 0 0.2em 0.3em 0 rgba(from var(--clay-radio-color-shadow) r g b / 0.3);
            }

            &:hover &__input:checked + &__control::after
            {
                @include mixins.clay-shadow-elevation($intensity: 0.4); // stesso problema dell'elevazione che scompare.
            }

            &__input:checked + &__control::before,
            &__input:checked + &__control::after
            {
                transform: translate(-50%, -50%) scale(1);
            }

            &__input:focus-visible + &__control
            {
                box-shadow: functions.clay-outline($color: var(--clay-radio-color-outline), $width: 0.15em),
                            inset 0 -0.0625em 0.125em 0 rgba(from var(--white) r g b / 0.5),
                            inset 0 0.125em 0.25em 0 rgba(from var(--clay-radio-color-shadow) r g b / 0.35),
                            0 0 0.35em 0.1em rgba(from var(--clay-radio-color-outline) r g b / 0.25);
            }

            &--disabled
            {
                cursor: not-allowed;
                opacity: 0.5;

                .clay-radio__control
                {
                    transform: none;
                }
            }

            &--small
            {
                font-size: 0.75em;
            }
            &--large
            {
                font-size: 1.5em;
            }
        }

        @media (prefers-color-scheme: dark)
        {
            :root
            {
                --clay-radio-color-background: oklch(from var(--clay-dark-color) calc(l + 0.075) c h);
                --clay-radio-color-shadow: var(--black);
            }
        }
    }
</style>
