<script setup lang="ts">
    import { computed, watch } from "vue";

    import FontAwesome from "@/components/core/FontAwesome.vue";

    import type { ColorScheme } from "@/types";

    const theme = defineModel<ColorScheme>({ default: "light" });

    const isDark = computed<boolean>({
        get: (): boolean => theme.value === "dark",
        set: (value: boolean): void => { theme.value = value ? "dark" : "light"; }
    });

    watch(theme, (scheme: ColorScheme): void =>
    {
        if (typeof window === "undefined") { return; }

        const { body } = window.document;

        body.toggleAttribute("dark", scheme === "dark");
        body.toggleAttribute("light", scheme === "light");

    }, { immediate: true });
</script>

<template>
    <label class="clay-theme-controller">
        <input v-model="isDark"
               type="checkbox"
               class="clay-theme-controller__input" />
        <span class="clay-theme-controller__slider">
            <FontAwesome icon="cloud" class="clay-theme-controller__cloud" />
            <span class="clay-theme-controller__stars">
                <span class="clay-theme-controller__star"></span>
                <span class="clay-theme-controller__star"></span>
                <span class="clay-theme-controller__star"></span>
            </span>
            <span class="clay-theme-controller__knob">
                <span class="clay-theme-controller__crater"></span>
                <span class="clay-theme-controller__crater"></span>
                <span class="clay-theme-controller__crater"></span>
            </span>
        </span>
    </label>
</template>

<style lang="scss">
    @use "@/assets/scss/mixins";
    @use "@/assets/scss/functions";

    :root
    {
        --clay-themecontroller-color-off: var(--clay-primary-color);
        --clay-themecontroller-color-on: oklch(from var(--black) calc(l + 0.4) c h);
        --clay-themecontroller-color-knob-sun: #FDE5AB;
        --clay-themecontroller-color-knob-moon: #D2DAE1;
        --clay-themecontroller-color-crater: oklch(from #D2DAE1 calc(l - 0.12) calc(c + 0.01) h);
        --clay-themecontroller-color-knob-elevation: var(--black);
        --clay-themecontroller-color-knob-shadow: oklch(from var(--clay-themecontroller-color-on) calc(l - 0.25) c h);

        --clay-themecontroller-color-sun-glow: oklch(from #FDE5AB l calc(c + 0.18) h);
        --clay-themecontroller-color-moon-glow: oklch(from #D2DAE1 calc(l + 0.05) calc(c + 0.03) h);

        --clay-themecontroller-color-shadow: oklch(from var(--black) calc(l - 0.25) c h);
        --clay-themecontroller-color-outline: oklch(from var(--clay-primary-color) l c calc(h + 180));

        --clay-themecontroller-shadow: inset 0 0.25em 0.25em 0 rgba(from
                                       var(--clay-themecontroller-color-shadow) r g b / 0.125),
                                       inset 0 -0.25em 0.25em 0 rgba(from var(--white) r g b / 0.25);

        --clay-themecontroller-width: 4em;
        --clay-themecontroller-height: 2em;
        --clay-themecontroller-knob-size: 1.5em;
        --clay-themecontroller-knob-offset: 0.25em;
    }

    .clay-theme-controller
    {
        cursor: pointer;
        display: inline-block;
        height: var(--clay-themecontroller-height);
        position: relative;
        width: var(--clay-themecontroller-width);
        transition: transform var(--clay-ease-duration) var(--clay-ease-function);

        .clay-theme-controller__input
        {
            height: 0;
            opacity: 0;
            position: absolute;
            width: 0;
        }

        .clay-theme-controller__slider
        {
            background-color: var(--clay-themecontroller-color-off);
            border-radius: var(--clay-themecontroller-height);
            box-shadow: var(--clay-themecontroller-shadow);
            bottom: 0;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                        box-shadow var(--clay-ease-duration) var(--clay-ease-function);

            & > .clay-theme-controller__knob
            {
                --clay-themecontroller-color-knob-shadow: oklch(from
                    var(--clay-themecontroller-color-knob-sun) calc(l - 0.25) c h );
                --clay-themecontroller-color-knob-glow:
                    var(--clay-themecontroller-color-sun-glow);
                    @include mixins.clay-shadow-elevation($color:
                    var(--clay-themecontroller-color-knob-elevation), $intensity: 0.125);
                border-radius: 50%;
                background-color: var(--clay-themecontroller-color-knob-sun);
                bottom: var(--clay-themecontroller-knob-offset);
                content: "";
                height: var(--clay-themecontroller-knob-size);
                left: var(--clay-themecontroller-knob-offset);
                position: absolute;
                width: var(--clay-themecontroller-knob-size);
                transition: transform var(--clay-ease-duration) var(--clay-ease-function),
                        box-shadow var(--clay-ease-duration) var(--clay-ease-function),
                        background-color var(--clay-ease-duration) var(--clay-ease-function);

                &::before
                {
                    @include mixins.clay-shadow-puff($intensity: 0.5);
                    border-radius: 50%;
                    bottom: 0;
                    content: "";
                    left: 0;
                    mix-blend-mode: luminosity;
                    position: absolute;
                    right: 0;
                    top: 0;
                }

                & > .clay-theme-controller__crater
                {
                    background-color: var(--clay-themecontroller-color-crater);
                    border-radius: 50%;
                    box-shadow: inset 0 0.05em 0.075em 0 rgba(from var(--black) r g b / 0.25);
                    opacity: 0;
                    position: absolute;
                    transition: opacity var(--clay-ease-duration) var(--clay-ease-function);

                    &:nth-child(1) { height: 0.4em;  width: 0.4em;  left: 0.3em;  top: 0.3em; }
                    &:nth-child(2) { height: 0.28em; width: 0.28em; left: 0.85em; top: 0.8em; }
                    &:nth-child(3) { height: 0.2em;  width: 0.2em;  left: 0.95em; top: 0.35em; }
                }
            }

            & > .clay-theme-controller__cloud
            {
                color: var(--white);
                // filter: drop-shadow(0 0.075em 0.05em rgba(from var(--black) r g b / 0.25));
                font-size: 0.85em;
                position: absolute;
                right: 0.7em;
                top: 50%;
                text-shadow: 0 0.075em 0.05em rgba(from var(--black) r g b / 0.25);
                transform: translateY(-50%);
                transition: opacity var(--clay-ease-duration) var(--clay-ease-function),
                            transform var(--clay-ease-duration) var(--clay-ease-function),
                            text-shadow var(--clay-ease-duration) var(--clay-ease-function);
            }

            & > .clay-theme-controller__stars
            {
                bottom: 0;
                left: 0.3em;
                opacity: 0;
                position: absolute;
                top: 0;
                transition: opacity var(--clay-ease-duration) var(--clay-ease-function);
                width: 1.7em;

                & > .clay-theme-controller__star
                {
                    background-color: var(--white);
                    border-radius: 50%;
                    box-shadow: 0 0 0.15em 0.025em rgba(from var(--white) r g b / 0.75);
                    position: absolute;

                    &:nth-child(1) { height: 0.14em; width: 0.14em; left: 0.2em;  top: 0.7em; }
                    &:nth-child(2) { height: 0.2em;  width: 0.2em;  left: 1em;    top: 0.4em; }
                    &:nth-child(3) { height: 0.1em;  width: 0.1em;  left: 0.7em;  top: 1.25em; }
                }
            }
        }

        .clay-theme-controller__input:checked + .clay-theme-controller__slider
        {
            background-color: var(--clay-themecontroller-color-on);

            & > .clay-theme-controller__knob
            {
                --clay-themecontroller-color-knob-shadow: oklch(from
                    var(--clay-themecontroller-color-knob-moon) calc(l - 0.25) c h);
                --clay-themecontroller-color-knob-glow:
                    var(--clay-themecontroller-color-moon-glow);

                background-color: var(--clay-themecontroller-color-knob-moon);
                transform: translateX(
                           calc(var(--clay-themecontroller-width) -
                           var(--clay-themecontroller-knob-size) - 2 *
                           var(--clay-themecontroller-knob-offset))
                );

                & > .clay-theme-controller__crater
                {
                    opacity: 1;
                }
            }

            & > .clay-theme-controller__cloud
            {
                opacity: 0;
                transform: translateY(-50%) translateX(0.5em);
            }

            & > .clay-theme-controller__stars
            {
                opacity: 1;

                & > .clay-theme-controller__star
                {
                    animation: clay-theme-controller-twinkle 4s var(--clay-ease-function) infinite;

                    &:nth-child(2) { animation-delay: 0.4s; }
                    &:nth-child(3) { animation-delay: 0.8s; }
                }
            }
        }

        .clay-theme-controller__input:focus-visible + .clay-theme-controller__slider
        {
            box-shadow: var(--clay-themecontroller-shadow),
                        functions.clay-outline($color: var(--clay-themecontroller-color-outline), $width: 0.2em);
        }

        &:hover
        {
            .clay-theme-controller__slider > .clay-theme-controller__knob
            {
                box-shadow: 0 0 0.5em 0.15em rgba(from var(--clay-themecontroller-color-knob-glow) r g b / 0.75),
                            0 0.25em 0.5em -0.25em rgba(from var(--black) r g b / 0.75);
            }

            .clay-theme-controller__slider > .clay-theme-controller__cloud
            {
                text-shadow: 0.075em 0.075em 0.05em rgba(from var(--black) r g b / 0.25);
            }
        }

        &:has(.clay-theme-controller__input:focus-visible)
        {
            transform: translateY(-0.0625em) scale(1.1);
        }
    }

    @keyframes clay-theme-controller-twinkle
    {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.25; }
    }

    @media (prefers-reduced-motion: reduce)
    {
        .clay-theme-controller .clay-theme-controller__star
        {
            animation: none;
        }
    }

    @media (prefers-color-scheme: dark)
    {
    }
</style>
