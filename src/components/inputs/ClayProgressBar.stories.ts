import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ClayProgressBar from "./ClayProgressBar.vue";

interface StoryArgs
{
    progress: number;
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
        }
    },
    args: {
        progress: 50
    }
};

export const Default: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayProgressBar },
        setup: () => ({ args }),
        template: `<ClayProgressBar v-bind="args" />`
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

export default meta;
