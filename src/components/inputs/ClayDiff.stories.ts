import { ref, watch } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ClayDiff from "./ClayDiff.vue";

interface StoryArgs
{
    id: string;
    src: string;
    alt: string;
    label: string;
    blur: number;
    variant: "blur" | "glass" | "liquid-glass";
    progress: number;
    size: "small" | "default" | "large";
}

const meta: Meta<StoryArgs> = {
    title: "Inputs/ClayDiff",
    component: ClayDiff,
    tags: ["autodocs"],
    argTypes: {
        id: {
            name: "Id",
            type: { name: "string", required: true },
            description: "The id associated to the slider input.",
            table: {
                category: "Component's",
                defaultValue: { summary: "storybook--story__clay-diff" },
                type: { summary: "string" }
            },
            control: "text"
        },
        src: {
            name: "Source",
            type: { name: "string", required: true },
            description: "The image source used for both original and blurred layers.",
            table: {
                category: "Component's",
                defaultValue: { summary: "https://picsum.photos/1200/800" },
                type: { summary: "string" }
            },
            control: "text"
        },
        alt: {
            name: "Alternative text",
            type: { name: "string", required: false },
            description: "Alternative text for the base image.",
            table: {
                category: "Component's",
                defaultValue: { summary: "Mountain landscape" },
                type: { summary: "string" }
            },
            control: "text"
        },
        label: {
            name: "Slider label",
            type: { name: "string", required: false },
            description: "Accessible label shown above the slider.",
            table: {
                category: "Component's",
                defaultValue: { summary: "Blur diff" },
                type: { summary: "string" }
            },
            control: "text"
        },
        blur: {
            name: "Blur strength",
            type: { name: "number", required: false },
            description: "Blur intensity expressed in em units.",
            table: {
                category: "Component's",
                defaultValue: { summary: "0.75" },
                type: { summary: "number" }
            },
            control: { type: "range", min: 0.1, max: 2, step: 0.05 }
        },
        variant: {
            name: "Variant",
            type: { name: "string", required: false },
            description: "The reveal effect applied to the overlay: a direct blur, a frosted or a liquid glass pane.",
            table: {
                category: "Component's",
                defaultValue: { summary: "blur" },
                type: { summary: "blur | glass | liquid-glass" }
            },
            control: {
                type: "inline-radio",
                labels: {
                    "blur": "Blur",
                    "glass": "Glass",
                    "liquid-glass": "Liquid glass"
                }
            },
            options: ["blur", "glass", "liquid-glass"]
        },
        progress: {
            name: "Progress",
            type: { name: "number", required: false },
            description: "Initial slider position from 0 to 100.",
            table: {
                category: "Component's",
                defaultValue: { summary: "50" },
                type: { summary: "number" }
            },
            control: { type: "range", min: 0, max: 100, step: 1 }
        },
        size: {
            name: "Size",
            type: { name: "string", required: false },
            description: "The size of the diff component.",
            table: {
                category: "Component's",
                defaultValue: { summary: "default" },
                type: { summary: "small | default | large" }
            },
            control: {
                type: "select",
                labels: {
                    small: "Small",
                    default: "Default",
                    large: "Large"
                }
            },
            options: ["small", "default", "large"]
        }
    },
    args: {
        id: "storybook--story__clay-diff",
        src: "https://picsum.photos/1200/800",
        alt: "Mountain landscape",
        label: "Blur diff",
        blur: 0.75,
        variant: "blur",
        progress: 50,
        size: "default"
    }
};

export const Default: StoryObj<StoryArgs> = {
    render: (args) => ({
        components: { ClayDiff },
        setup: () =>
        {
            const progress = ref(args.progress);
            watch(() => args.progress, (value): void =>
            {
                progress.value = value;
            });

            return { args, progress };
        },
        template: `<ClayDiff :id="args.id"
                             v-model="progress"
                             :src="args.src"
                             :alt="args.alt"
                             :label="args.label"
                             :blur="args.blur"
                             :glass="args.variant === 'glass'"
                             :liquid-glass="args.variant === 'liquid-glass'"
                             :small="args.size === 'small'"
                             :large="args.size === 'large'" />`
    })
};

export const Glass: StoryObj<StoryArgs> = {
    args: {
        label: "Glass diff",
        variant: "glass"
    },
    render: Default.render
};

export const LiquidGlass: StoryObj<StoryArgs> = {
    args: {
        label: "Liquid glass diff",
        variant: "liquid-glass"
    },
    render: Default.render
};

export default meta;
