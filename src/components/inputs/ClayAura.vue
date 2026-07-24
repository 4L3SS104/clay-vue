<script lang="ts" setup>
    import { computed } from "vue";
    import type { PropType } from "vue";

    const props = defineProps({
        variant: {
            default: "default",
            type: String as PropType<"default" | "dual" | "rainbow" | "glow">
        },
        small: {
            default: false,
            type: Boolean
        },
        large: {
            default: false,
            type: Boolean
        }
    });

    const classes = computed((): Record<string, boolean> => ({
        "clay-aura--dual": props.variant === "dual",
        "clay-aura--rainbow": props.variant === "rainbow",
        "clay-aura--glow": props.variant === "glow",

        "clay-aura--small": props.small,
        "clay-aura--large": props.large
    }));
</script>

<template>
    <div class="clay-aura" :class="classes">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    --clay-aura-angle
    {
        syntax: "<angle>";
        inherits: false;
        initial-value: 0deg;
    }

    @keyframes clay-aura-spin
    {
        to { --clay-aura-angle: 360deg; }
    }

    @keyframes clay-aura-pulse
    {
        50% { opacity: 1; transform: scale(1.05); }
    }

        :root
        {
            --clay-aura-color: var(--clay-primary-color);

            --clay-aura-stops:
                transparent 0deg,
                var(--clay-aura-color) 45deg,
                transparent 130deg,
                transparent 360deg;

            --clay-aura-spread: 0.25em;
            --clay-aura-blur-ring: 0.2em;
            --clay-aura-blur-glow: 1em;
            --clay-aura-roundness: 1em;

            --clay-aura-opacity-ring: 0.9;
            --clay-aura-opacity-glow: 0.6;

            --clay-aura-duration: 4s;
        }

        .clay-aura
        {
            border-radius: var(--clay-aura-roundness);
            display: inline-block;
            isolation: isolate;
            margin: 0;
            position: relative;

            &::before,
            &::after
            {
                background: radial-gradient(closest-side, var(--clay-aura-color), transparent);
                border-radius: inherit;
                content: "";
                inset: calc(-1 * var(--clay-aura-spread));
                position: absolute;
            }
            &::before
            {
                filter: blur(var(--clay-aura-blur-ring));
                opacity: var(--clay-aura-opacity-ring);
                z-index: -1;
            }
            &::after
            {
                filter: blur(var(--clay-aura-blur-glow));
                opacity: var(--clay-aura-opacity-glow);
                z-index: -2;
            }

            &.clay-aura--dual
            {
                --clay-aura-stops:
                    transparent 0deg,
                    var(--clay-aura-color) 45deg,
                    transparent 130deg,
                    transparent 180deg,
                    var(--clay-aura-color) 225deg,
                    transparent 310deg,
                    transparent 360deg;
            }

            &.clay-aura--small
            {
                font-size: 0.75em;
            }
            &.clay-aura--large
            {
                font-size: 1.5em;
            }

        @media (prefers-reduced-motion: no-preference)
        {
            .clay-aura
            {
                &::before,
                &::after
                {
                    animation: clay-aura-spin var(--clay-aura-duration) linear infinite;
                    background: conic-gradient(from var(--clay-aura-angle), var(--clay-aura-stops));
                }

                &.clay-aura--rainbow
                {
                    &::before,
                    &::after
                    {
                        background: conic-gradient(from var(--clay-aura-angle) in oklch longer hue,
                                                   oklch(0.75 0.2 0),
                                                   oklch(0.75 0.2 360));
                    }
                }

                &.clay-aura--glow
                {
                    &::before,
                    &::after
                    {
                        animation: clay-aura-pulse var(--clay-aura-duration) var(--clay-ease-function) infinite;
                        background: radial-gradient(closest-side, var(--clay-aura-color), transparent);
                    }
                }
            }
        }

        @media (forced-colors: active)
        {
            .clay-aura
            {
                &::before,
                &::after
                {
                    display: none;
                }
            }
        }

        @media (prefers-color-scheme: dark)
        {
            :root
            {
                --clay-aura-opacity-ring: 1;
                --clay-aura-opacity-glow: 0.75;
            }
        }
    }
</style>
