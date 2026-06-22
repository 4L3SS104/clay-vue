<script setup lang="ts">
    import { computed } from "vue";

    const props = defineProps({
        progress: {
            type: Number,
            default: 0,
            validator: (value: number) => value >= 0 && value <= 100
        },
        glass: {
            type: Boolean,
            default: false
        },
        liquidGlass: {
            type: Boolean,
            default: false
        },
        indeterminate: {
            type: Boolean,
            default: false
        }
    });

    const classes = computed((): Record<string, boolean> => ({
        "clay-progress-bar--glass": props.glass,
        "clay-progress-bar--liquid-glass": props.liquidGlass,
        "clay-progress-bar--indeterminate": props.indeterminate
    }));
</script>

<template>
    <label class="clay-progress-bar"
           :class="classes"
           :style="indeterminate ? undefined : { '--_w': `${progress}%` }"
           role="progressbar"
           :aria-valuemin="indeterminate ? undefined : 0"
           :aria-valuemax="indeterminate ? undefined : 100"
           :aria-valuenow="indeterminate ? undefined : progress">
        <span class="clay-progress-bar__track">
            <span class="clay-progress-bar__indicator"
                  :style="indeterminate ? undefined : { width: `${progress}%` }"></span>
        </span>
    </label>
</template>

<style lang="scss">
    @use "@/assets/scss/mixins";
    @use "@/assets/scss/functions";

    :root
    {
        --clay-progress-bar-background-color: oklch(from var(--clay-light-color) calc(l - 0.15) c h);
        --clay-progress-bar-background-opacity: 1.0;
        --clay-progress-bar-background-blur: 0.5em;
        --clay-progress-bar-indicator-color: var(--clay-primary-color);
        --clay-progress-bar-indicator-color-shadow-background:
            inset 0 0.25em 0.25em 0 rgba(from var(--black) r g b / 0.125);
        --clay-progress-bar-shadow-color: var(--black);

        --clay-border-radius: 0.35rem;
        --clay-progress-bar-height: 0.75rem;
        --clay-progress-bar-indeterminate-segment: 40%;
        --clay-progress-bar-indeterminate-duration: 1.2s;
    }

    .clay-progress-bar
    {
        border-radius: var(--clay-border-radius);
        display: block;
        height: var(--clay-progress-bar-height);
        position: relative;
        width: 100%;
        z-index: 0;

        &::after
        {
            @include mixins.clay-shadow-elevation($intensity: 0.5);
            border-radius: var(--clay-border-radius);
            content: "";
            inset: 0;
            pointer-events: none;
            position: absolute;
            transition: width 0.1s ease;
            width: var(--_w, 0%);
            z-index: 1;
        }

        &__track
        {
            background-color: rgba(from var(--clay-progress-bar-background-color) r g b /
                                        var(--clay-progress-bar-background-opacity));
            border-radius: var(--clay-border-radius);
            box-shadow: var(--clay-progress-bar-indicator-color-shadow-background);
            inset: 0;
            overflow: hidden;
            position: absolute;
        }

            &--glass
            {
                --clay-progress-bar-background-opacity: 0.4;

                backdrop-filter: blur(var(--clay-progress-bar-background-blur)) saturate(180%);
            }

            &--liquid-glass
            {
                --clay-progress-bar-background-opacity: 0.15;

                backdrop-filter: blur(var(--clay-progress-bar-background-blur)) saturate(200%) brightness(1.1);

                .clay-progress-bar__track::after
                {
                    border-radius: var(--clay-border-radius);
                    background-image: linear-gradient(rgba(from var(--white) r g b / 0.55),
                        rgba(from var(--white) r g b / 0) 45%);
                    box-shadow:
                        inset 0 0.08em 0.06em -0.02em rgba(from var(--white) r g b / 0.7),
                        inset 0 -0.06em 0.08em -0.02em rgba(from var(--black) r g b / 0.25);
                    content: "";
                    inset: 0;
                    position: absolute;
                    pointer-events: none;
                    z-index: 1;
                }
            }

            &--indeterminate
            {
                .clay-progress-bar__indicator
                {
                    animation: clay-progress-bar-indeterminate
                               var(--clay-progress-bar-indeterminate-duration)
                               var(--clay-ease-function) infinite alternate;
                    width: var(--clay-progress-bar-indeterminate-segment);
                }
            }

        &__indicator
        {
            align-items: center;
            background-color: var(--clay-progress-bar-indicator-color);
            border-radius: var(--clay-border-radius);
            display: block;
            position: absolute;
            height: 100%;
            transition: width 0.1s ease;
            z-index: 0;

        &::before
                {
                    @include mixins.clay-shadow-puff($intensity: 0.25);
                    border-radius: var(--clay-border-radius);
                    content: "";
                    inset: 0;
                    position: absolute;
                    z-index: -1;
                }
        }
    }

    @keyframes clay-progress-bar-indeterminate
    {
        from
        {
            left: 0;
            transform: scaleX(0.85);
        }
        to
        {
            left: calc(100% - var(--clay-progress-bar-indeterminate-segment));
            transform: scaleX(1.15);
        }
    }

    @media (prefers-reduced-motion: reduce)
    {
        .clay-progress-bar--indeterminate .clay-progress-bar__indicator
        {
            animation: clay-progress-bar-indeterminate-pulse 2s ease-in-out infinite;
            left: calc(50% - (var(--clay-progress-bar-indeterminate-segment) / 2));
        }
    }

    @keyframes clay-progress-bar-indeterminate-pulse
    {
        0%,
        100% { opacity: 0.5; }
        50% { opacity: 1; }
    }

    @media (prefers-color-scheme: dark)
    {
        :root
        {
            --clay-progress-bar-background-color: oklch(from var(--clay-light-color) calc(l - 0.35) c h);
            --clay-progress-bar-indicator-color-shadow-background:
                inset 0 0.25em 0.25em 0 rgba(from var(--black) r g b / 0.15);
        }
    }
</style>
