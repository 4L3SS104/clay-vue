<script setup lang="ts">
    import type { PropType } from "vue";
    import ClayCard from "../ClayCard.vue";
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
        </ClayCard>
    </div>
</template>

<style lang="scss">
    @use "@/assets/scss/mixins";
    @use "@/assets/scss/functions";

    :root
    {
        --clay-modal-overlay-color-background: rgba(from var(--clay-dark-color) r g b / 0.5);
        --clay-modal-overlay-opacity: 1.0;
    }

    .clay-modal-overlay
    {
        background-color: rgba(from var(--clay-modal-overlay-color-background) r g b /
                                    var(--clay-modal-overlay-opacity));
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 1000;

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
</style>
