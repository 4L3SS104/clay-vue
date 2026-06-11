<script setup lang="ts">
</script>

<template>
    <label ref="$el" class="clay-theme-controller">
        <input type="checkbox" class="clay-theme-controller__input" />
        <span class="clay-theme-controller__slider">
            <span class="clay-theme-controller__knob"></span>
        </span>
    </label>
</template>

<style lang="scss">
    @use "@/assets/scss/mixins";
    @use "@/assets/scss/functions";

    :root
    {
        --clay-themecontroller-color-off: oklch(from var(--clay-light-color) calc(l - 0.15) c h);
        --clay-themecontroller-color-on: var(--clay-primary-color);
        --clay-themecontroller-color-knob: var(--white);
        --clay-themecontroller-color-knob-elevation: var(--black);
        --clay-themecontroller-color-knob-shadow: oklch(from var(--clay-themecontroller-color-on) calc(l - 0.25) c h);
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
                background-color: var(--clay-themecontroller-color-knob);
                --clay-themecontroller-color-knob-shadow: oklch(from
                var(--clay-themecontroller-color-knob) calc(l - 0.25) c h );
                border-radius: 50%;
                bottom: var(--clay-themecontroller-knob-offset);
                content: "";
                height: var(--clay-themecontroller-knob-size);
                left: var(--clay-themecontroller-knob-offset);
                position: absolute;
                transition: transform var(--clay-ease-duration) var(--clay-ease-function);
                width: var(--clay-themecontroller-knob-size);
                @include mixins.clay-shadow-elevation($color:
                var(--clay-themecontroller-color-knob-elevation), $intensity: 0.125);
                transition: transform var(--clay-ease-duration) var(--clay-ease-function),
                        box-shadow var(--clay-ease-duration) var(--clay-ease-function);

                &::before
                {
                    border-radius: 50%;
                    bottom: 0;
                    left: 0;
                    mix-blend-mode: luminosity;
                    position: absolute;
                    right: 0;
                    top: 0;
                    content: "";
                    @include mixins.clay-shadow-puff($intensity: 0.5);
                }
            }
        }

        .clay-theme-controller__input:checked + .clay-theme-controller__slider
        {
            background-color: var(--clay-themecontroller-color-on);

            & > .clay-theme-controller__knob
            {
                transform: translateX(
                    calc(var(--clay-themecontroller-width) -
                    var(--clay-themecontroller-knob-size) - 2 * var(--clay-themecontroller-knob-offset))
                );
            }
        }

        .clay-theme-controller__input:focus-visible + .clay-theme-controller__slider
        {
            box-shadow: var(--clay-themecontroller-shadow),
                        functions.clay-outline($color: var(--clay-themecontroller-color-outline), $width: 0.2em);
        }

        &:hover .clay-theme-controller__slider > .clay-theme-controller__knob
        {
            @include mixins.clay-shadow-elevation($color:
            var(--clay-themecontroller-color-knob-elevation), $intensity: 0.35);
        }
    }

    &:focus-visible
        {
            box-shadow: functions.clay-outline($color: var(--clay-themecontroller-color-outline), $width: 0.15em),
                        0 0.25em 0.25em 0 rgba(from var(--clay-themecontroller-color-shadow) r g b / 0.333);

            transform: translateY(-0.0625em) scale(1.1);
        }

    @media (prefers-color-scheme: dark)
    {
        :root
        {
            --clay-themecontroller-color-off: oklch(from var(--clay-dark-color) calc(l + 0.15) c h);
            --clay-themecontroller-color-on: oklch(from var(--clay-primary-color) calc(l - 0.2) c h);
            --clay-themecontroller-shadow: inset 0 0.25em 0.25em 0 rgba(from
                                            var(--clay-themecontroller-color-shadow) r g b / 0.125),
                                          inset 0 -0.25em 0.25em 0 rgba(from var(--white) r g b / 0.075);
            --clay-themecontroller-color-knob: oklch(from var(--white) calc(l - 0.125) c h);
        }

        .clay-theme-controller .clay-theme-controller__input:checked +
        .clay-theme-controller__slider > .clay-theme-controller__knob
        {
            --clay-themecontroller-color-knob: var(--white);
            --clay-themecontroller-color-knob-elevation: var(--white);
            box-shadow: 0 0 0.375em 0 rgba(from var(--clay-themecontroller-color-knob-elevation) r g b / 0.25);
        }

        .clay-theme-controller:hover .clay-theme-controller__input:checked +
        .clay-theme-controller__slider > .clay-theme-controller__knob
        {
            box-shadow: 0 0 0.375em 0 rgba(from var(--clay-themecontroller-color-knob-elevation) r g b / 0.5);
        }

        .clay-theme-controller .clay-theme-controller__input:checked +
        .clay-theme-controller__slider > .clay-theme-controller__knob::before
        {
            @include mixins.clay-shadow-puff($intensity: 0.75);
        }
    }
</style>
