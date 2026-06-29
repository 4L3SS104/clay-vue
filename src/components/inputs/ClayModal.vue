<script setup lang="ts">
    import type { PropType } from "vue";
    import ClayCard from "../ClayCard.vue";
    import ClayButton from "../ClayButton.vue";
    import { computed } from "vue";

    const props = defineProps({
        open: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ""
        },
        elevation: {
            default: "default",
            type: String as PropType<"none" | "low" | "default" | "high">
        },
        glass: {
            default: false,
            type: Boolean
        },
        backgroundUrl: {
            type: String,
            default: ""
        },
        button1Label: {
            type: String,
            default: ""
        },
        button1Size: {
            default: "default",
            type: String as PropType<"small" | "default" | "large">
        },
        button1Visible: {
            type: Boolean,
            default: false
        },
        button2Label: {
            type: String,
            default: ""
        },
        button2Size: {
            default: "default",
            type: String as PropType<"small" | "default" | "large">
        },
        button2Visible: {
            type: Boolean,
            default: false
        },
        button3Label: {
            type: String,
            default: ""
        },
        button3Size: {
            default: "default",
            type: String as PropType<"small" | "default" | "large">
        },
        button3Visible: {
            type: Boolean,
            default: false
        }
    });

    const overlayStyle = computed(() =>
    {
        if (props.backgroundUrl)
        {
            return {
                backgroundImage: `url('${props.backgroundUrl}')`,
                backgroundSize: "cover"
            };
        }
        return {};
    });

    const hasButtons = computed(() =>
        props.button1Visible || props.button2Visible || props.button3Visible
    );

    const actionCount = computed(() =>
        Number(props.button1Visible) + Number(props.button2Visible) + Number(props.button3Visible)
    );
</script>

<template>
    <div v-if="props.open"
         class="clay-modal-overlay"
         :style="overlayStyle">
        <ClayCard class="clay-modal-content"
                  :elevation="props.elevation"
                  :glass="props.glass">
            <h2 v-if="props.title">
                {{ props.title }}
            </h2>
            <slot></slot>
            <div v-if="hasButtons" class="clay-modal-divider"></div>
            <div v-if="hasButtons"
                 :class="[
                     'clay-modal-footer',
                     `clay-modal-footer--${actionCount}`
                 ]">
                <ClayButton v-if="props.button1Visible"
                            :small="props.button1Size === 'small'"
                            :large="props.button1Size === 'large'">
                    {{ props.button1Label }}
                </ClayButton>
                <ClayButton v-if="props.button2Visible"
                            :small="props.button2Size === 'small'"
                            :large="props.button2Size === 'large'">
                    {{ props.button2Label }}
                </ClayButton>
                <ClayButton v-if="props.button3Visible"
                            :small="props.button3Size === 'small'"
                            :large="props.button3Size === 'large'">
                    {{ props.button3Label }}
                </ClayButton>
            </div>
        </ClayCard>
    </div>
</template>

<style lang="scss">
    @use "@/assets/scss/mixins";
    @use "@/assets/scss/functions";

    :root
    {

        --clay-modal-divider-color: rgba(from var(--clay-dark-color) r g b / 0.15);
        --clay-modal-footer-gap: 0.75em;
        --clay-modal-footer-inline-padding: 0.5em;
        --clay-modal-divider-spacing: 0.75em;
    }

    .clay-modal-overlay
    {

        background-color: var(--clay-modal-overlay-opacity);
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 0;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .clay-modal-content
    {
        max-height: 90%;
        max-width: 90%;
        overflow-y: auto;
    }

    .clay-modal-divider
    {
        border: none;
        border-top: 1px solid var(--clay-modal-divider-color);
        margin-block: var(--clay-modal-divider-spacing);
    }

    .clay-modal-footer
    {
        align-items: center;
        column-gap: var(--clay-modal-footer-gap);
        display: grid;
        padding-inline: var(--clay-modal-footer-inline-padding);
        row-gap: var(--clay-modal-footer-gap);
    }

    .clay-modal-footer--1
    {
        grid-template-columns: minmax(0, 1fr);
    }

    .clay-modal-footer--1 > *
    {
        justify-self: center;
    }

    .clay-modal-footer--2
    {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .clay-modal-footer--2 > :first-child
    {
        justify-self: start;
    }

    .clay-modal-footer--2 > :last-child
    {
        justify-self: end;
    }

    .clay-modal-footer--3
    {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .clay-modal-footer--3 > :first-child
    {
        justify-self: start;
    }

    .clay-modal-footer--3 > :nth-child(2)
    {
        justify-self: center;
    }

    .clay-modal-footer--3 > :last-child
    {
        justify-self: end;

    }

    @media (prefers-color-scheme: dark)
    {
        :root
        {
            --clay-modal-divider-color: rgba(from var(--clay-light-color) r g b / 0.15);
        }
    }
</style>
