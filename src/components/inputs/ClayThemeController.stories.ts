import type { Meta, StoryObj } from "@storybook/vue3-vite";

import type { ColorScheme } from "@/types";

import ClayThemeController from "./ClayThemeController.vue";

interface StoryArgs
{
    theme: ColorScheme;
}

const meta: Meta<StoryArgs> = {
    title: "Inputs/ClayThemeController",
    component: ClayThemeController,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "A toggle control that switches the active color scheme between `light` and `dark`."
            }
        }
    },
    argTypes: {
        theme: {
            name: "Theme",
            type: { name: "string", required: false },
            description: "The currently active color scheme.",
            table: {
                category: "Component's",
                defaultValue: { summary: "light" },
                type: { summary: "light | dark" }
            },
            control: {
                type: "inline-radio",
                labels: {
                    light: "Light",
                    dark: "Dark"
                }
            },
            options: ["light", "dark"]
        }
    },
    args: {
        theme: "light"
    }
};

export const Default: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayThemeController },
        setup: () => ({ args }),
        template: `<ClayThemeController v-model="args.theme" />`
    })
};

export const Light: StoryObj<StoryArgs> = {
    args: { theme: "light" },
    render: (args: StoryArgs) => ({
        components: { ClayThemeController },
        setup: () => ({ args }),
        template: `<ClayThemeController v-model="args.theme" />`
    })
};

export const Dark: StoryObj<StoryArgs> = {
    args: { theme: "dark" },
    render: (args: StoryArgs) => ({
        components: { ClayThemeController },
        setup: () => ({ args }),
        template: `<ClayThemeController v-model="args.theme" />`
    })
};

export default meta;
