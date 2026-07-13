<script lang="ts">
    export interface ClayMenuItem
    {
        label: string;
        value?: unknown;
        href?: string;
        target?: string;
        disabled?: boolean;
    }
</script>

<script lang="ts" setup>
    import { computed, ref } from "vue";
    import type { PropType } from "vue";

    const props = defineProps({
        items: {
            default: (): ClayMenuItem[] => [],
            type: Array as PropType<ClayMenuItem[]>
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

    const emit = defineEmits<{
        select: [value: unknown, event: Event];
    }>();

    const classes = computed((): Record<string, boolean> => ({
        "clay-menu--small": props.small,
        "clay-menu--large": props.large
    }));

    const $el = ref<HTMLElement | null>(null);

    const onItemClick = (item: ClayMenuItem, event: MouseEvent): void =>
    {
        if (item.disabled)
        {
            event.preventDefault();

            return;
        }

        emit("select", item.value, event);
    };

    // Progressive enhancement: menu items are native links/buttons, so they are
    // reachable with `Tab` even without JS. When JS runs we additionally wire up
    // the `ArrowUp`/`ArrowDown`/`Home`/`End` roving expected from a menu widget.
    const _items = (): HTMLElement[] =>
    {
        if (!($el.value)) { return []; }

        const selector = "[role=\"menuitem\"]:not([aria-disabled=\"true\"])";

        return Array.from($el.value.querySelectorAll<HTMLElement>(selector));
    };
    const _focus = (index: number): void =>
    {
        const items = _items();
        if (!(items.length)) { return; }

        items[(index + items.length) % items.length].focus();
    };

    const onKeyDown = (event: KeyboardEvent): void =>
    {
        const items = _items();
        const current = items.indexOf(document.activeElement as HTMLElement);

        switch (event.key)
        {
            case "ArrowDown":
                event.preventDefault();
                _focus(current + 1);
                break;

            case "ArrowUp":
                event.preventDefault();
                _focus(current - 1);
                break;

            case "Home":
                event.preventDefault();
                _focus(0);
                break;

            case "End":
                event.preventDefault();
                _focus(items.length - 1);
                break;
        }
    };
</script>

<template>
    <div ref="$el"
         class="clay-menu"
         :class="classes"
         role="menu"
         @keydown="onKeyDown">
        <component :is="item.href !== undefined ? 'a' : 'button'"
                   v-for="(item, index) in items"
                   :key="index"
                   class="clay-menu-item"
                   :class="{ 'clay-menu-item--disabled': item.disabled }"
                   role="menuitem"
                   :href="item.disabled ? undefined : item.href"
                   :target="item.href !== undefined ? item.target : undefined"
                   :type="item.href === undefined ? 'button' : undefined"
                   :aria-disabled="item.disabled || undefined"
                   :tabindex="item.disabled ? -1 : undefined"
                   @click="onItemClick(item, $event)">
            {{ item.label }}
        </component>
    </div>
</template>

<style lang="scss">
    @use "@/assets/scss/mixins";
    @use "@/assets/scss/functions";

    @layer clay
    {
        :root
        {
            --clay-menu-color-background: var(--clay-light-color);
            --clay-menu-color-shadow: oklch(from var(--clay-primary-color) calc(l - 0.25) c h);

            --clay-menu-spacing: 0.5em;
            --clay-menu-roundness: 1.25em;

            --clay-menu-item-color-outline: oklch(from var(--clay-primary-color) l c calc(h + 180));
            --clay-menu-item-color-highlight: oklch(from var(--clay-menu-color-background) calc(l + 0.04) c h);
            --clay-menu-item-color-shadow: oklch(from var(--clay-primary-color) calc(l - 0.25) c h);

            --clay-menu-item-spacing-x: 1em;
            --clay-menu-item-spacing-y: 0.5em;
            --clay-menu-item-spacing: var(--clay-menu-item-spacing-y) var(--clay-menu-item-spacing-x);

            --clay-menu-item-roundness: 0.75em;
        }

        .clay-menu
        {
            @include mixins.clay-shadow-elevation($color: var(--clay-menu-color-shadow));

            background-color: var(--clay-menu-color-background);
            background-image: linear-gradient(rgba(from var(--white) r g b / 0.25),
                                              rgba(from var(--black) r g b / 0.125));
            background-blend-mode: overlay;
            border-radius: var(--clay-menu-roundness);

            display: flex;
            flex-direction: column;
            gap: var(--clay-menu-spacing);
            margin: 0;
            min-width: 12em;
            padding: var(--clay-menu-spacing);
            perspective: 0;
            position: relative;
            transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                        box-shadow var(--clay-ease-duration) var(--clay-ease-function);

            z-index: 0;

            &::before
            {
                // On the near-white surface, `multiply` with the pastel primary is
                // barely perceptible; the darker shadow token reads as real depth.
                @include mixins.clay-shadow-puff($color: var(--clay-menu-color-shadow));

                border-radius: var(--clay-menu-roundness);
                content: "";
                inset: 0;
                mix-blend-mode: multiply;
                position: absolute;
                z-index: -1;
            }

            &.clay-menu--small
            {
                font-size: 0.75em;
            }
            &.clay-menu--large
            {
                font-size: 1.25em;
            }
        }

        .clay-menu-item
        {
            align-items: center;
            background-color: transparent;
            border: none;
            border-radius: var(--clay-menu-item-roundness);
            box-shadow: functions.clay-outline($color: var(--clay-menu-item-color-outline), $opacity: 0);

            color: var(--clay-text-color);
            cursor: pointer;
            display: flex;
            font-family: inherit;
            font-size: 1em;
            gap: 0.5em;
            isolation: isolate;
            outline: none;
            padding: var(--clay-menu-item-spacing);
            position: relative;
            text-align: start;
            text-decoration: none;
            width: 100%;
            transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                        box-shadow var(--clay-ease-duration) var(--clay-ease-function),
                        color var(--clay-ease-duration) var(--clay-ease-function),
                        transform var(--clay-ease-duration) var(--clay-ease-function);

            // The lifted item gets the same puffy inner depth as the panel: an
            // absolutely-positioned layer carrying the inset clay shadows. The
            // `isolation: isolate` above traps this `z-index: -1` layer *above* the
            // item's own background (so the highlight fill can't hide it) yet below
            // the label. Hidden at rest, faded in together with the lift.
            &::before
            {
                border-radius: var(--clay-menu-item-roundness);
                content: "";
                inset: 0;
                mix-blend-mode: multiply;
                opacity: 0;
                position: absolute;
                transition: opacity var(--clay-ease-duration) var(--clay-ease-function);
                z-index: -1;
            }

            &:not(.clay-menu-item--disabled):hover
            {
                background-color: var(--clay-menu-item-color-highlight);
                box-shadow: functions.clay-outline($color: var(--clay-menu-item-color-outline), $opacity: 0),
                            0 0.15em 0.3em -0.1em rgba(from var(--clay-menu-item-color-shadow) r g b / 0.4);

                transform: translateY(-0.0625em) scale(1.02);
            }

            &:not(.clay-menu-item--disabled):focus-visible
            {
                background-color: var(--clay-menu-item-color-highlight);
                box-shadow: functions.clay-outline($color: var(--clay-menu-item-color-outline), $width: 0.15em),
                            0 0.15em 0.3em -0.1em rgba(from var(--clay-menu-item-color-shadow) r g b / 0.4);

                transform: translateY(-0.0625em) scale(1.02);
            }

            &:not(.clay-menu-item--disabled):hover::before,
            &:not(.clay-menu-item--disabled):focus-visible::before
            {
                @include mixins.clay-shadow-puff($intensity: 0.5, $color: var(--clay-menu-item-color-shadow));

                opacity: 1;
            }

            &:not(.clay-menu-item--disabled):active
            {
                box-shadow: functions.clay-outline($color: var(--clay-menu-item-color-outline), $opacity: 0),
                            inset 0 0.15em 0.3em 0 rgba(from var(--clay-menu-item-color-shadow) r g b / 0.35);

                transform: translateY(0.05em) scaleX(1.03) scaleY(0.94);
            }

            &.clay-menu-item--disabled
            {
                cursor: not-allowed;
                opacity: 0.5;
            }
        }

        @media (prefers-color-scheme: dark)
        {
            :root
            {
                --clay-menu-color-background: var(--clay-dark-color);
                --clay-menu-color-shadow: var(--black);

                --clay-menu-item-color-shadow: var(--black);
            }

            .clay-menu::before
            {
                @include mixins.clay-shadow-puff();
            }
        }

        @media (prefers-reduced-motion: reduce)
        {
            .clay-menu-item:not(.clay-menu-item--disabled)
            {
                &:hover,
                &:focus-visible,
                &:active
                {
                    transform: none;
                }
            }
        }

        @media (forced-colors: active)
        {
            .clay-menu-item:focus-visible
            {
                outline: 2px solid Highlight;
                outline-offset: 2px;
            }
        }
    }
</style>
