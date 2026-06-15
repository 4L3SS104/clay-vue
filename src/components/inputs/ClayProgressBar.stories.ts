import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ClayProgressBar from "./ClayProgressBar.vue";

interface StoryArgs
{
    progress: number;
    glass: boolean;
    liquidGlass: boolean;
    indeterminate: boolean;
}

const meta: Meta<StoryArgs> = {
    title: "Inputs/ClayProgressBar",
    component: ClayProgressBar,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "A progress bar component that visually represents a value between 0 and 100."
            }
        }
    },
    argTypes: {
        progress: {
            name: "Progress",
            type: { name: "number", required: false },
            description: "The current progress value, between `0` and `100`.",
            table: {
                category: "Component's",
                defaultValue: { summary: "0" },
                type: { summary: "number" }
            },
            control: {
                type: "range",
                min: 0,
                max: 100,
                step: 1
            }
        },
        glass: {
            name: "Glass",
            type: { name: "boolean", required: false },
            description: "Whether to apply the glass effect to the progress bar's background.",
            table: {
                category: "Component's",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" }
            },
            control: { type: "boolean" }
        },
        liquidGlass: {
            name: "Liquid glass",
            type: { name: "boolean", required: false },
            description: "Whether to apply the liquid glass effect to the progress bar's background.",
            table: {
                category: "Component's",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" }
            },
            control: { type: "boolean" }
        },
        indeterminate: {
            name: "Indeterminate",
            type: { name: "boolean", required: false },
            description: "Whether the progress is unknown; shows a looping animation instead of a fixed value.",
            table: {
                category: "Component's",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" }
            },
            control: { type: "boolean" }
        }
    },
    args: {
        progress: 50,
        glass: false,
        liquidGlass: false,
        indeterminate: false
    }
};

export const Default: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayProgressBar },
        setup: () => ({ args }),
        template: `<ClayProgressBar v-bind="args" style="max-width: 300px;" />`
    })
};

export const Empty: StoryObj<StoryArgs> = {
    args: { progress: 0 },
    render: (args: StoryArgs) => ({
        components: { ClayProgressBar },
        setup: () => ({ args }),
        template: `<ClayProgressBar v-bind="args" />`
    })
};

export const Full: StoryObj<StoryArgs> = {
    args: { progress: 100 },
    render: (args: StoryArgs) => ({
        components: { ClayProgressBar },
        setup: () => ({ args }),
        template: `<ClayProgressBar v-bind="args" />`
    })
};

export const Indeterminate: StoryObj<StoryArgs> = {
    args: { indeterminate: true },
    render: (args: StoryArgs) => ({
        components: { ClayProgressBar },
        setup: () => ({ args }),
        template: `<ClayProgressBar v-bind="args" style="max-width: 300px;" />`
    })
};

export const Glass: StoryObj<StoryArgs> = {
    args: { glass: true },
    render: (args: StoryArgs) => ({
        components: { ClayProgressBar },
        setup: () => ({ args }),
        template: `
            <div style="background-image: url('https://picsum.photos/1920/1080');
                        background-size: cover;
                        padding: 2rem 4rem;">
                <ClayProgressBar v-bind="args" style="max-width: 300px;" />
            </div>
        `
    })
};

export const LiquidGlass: StoryObj<StoryArgs> = {
    args: { liquidGlass: true },
    render: (args: StoryArgs) => ({
        components: { ClayProgressBar },
        setup: () => ({ args }),
        template: `
            <div style="background-image: url('https://picsum.photos/1920/1080');
                        background-size: cover;
                        padding: 2rem 4rem;">
                <ClayProgressBar v-bind="args" style="max-width: 300px;" />
            </div>
        `
    })
};

export default meta;
