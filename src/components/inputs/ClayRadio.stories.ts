import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";

import ClayRadio from "./ClayRadio.vue";

interface StoryArgs
{
    size: "small" | "default" | "large";
    disabled: boolean;
}

const meta: Meta<StoryArgs> = {
    title: "Inputs/ClayRadio",
    component: ClayRadio,
    tags: ["autodocs"],
    argTypes: {
        size: {
            name: "Size",
            type: { name: "string", required: false },
            description: "The size of the radio button.",
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
        },
        disabled: {
            name: "Disabled",
            type: { name: "boolean", required: false },
            description: "Whether the radio button is disabled.",
            table: {
                category: "Component's",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" }
            },
            control: "boolean"
        }
    },
    args: {
        size: "default",
        disabled: false
    }
};

export const Default: StoryObj<StoryArgs> = {
    render: (args) => ({
        components: { ClayRadio },
        setup: () =>
        {
            const value = ref("");

            return { args, value };
        },
        template: `<ClayRadio id="storybook--story__clay-radio--1"
                              v-model="value"
                              name="example"
                              value="option1"
                              :small="args.size === 'small'"
                              :large="args.size === 'large'"
                              :disabled="args.disabled" />
                   <ClayRadio id="storybook--story__clay-radio--2"
                              v-model="value"
                              name="example"
                              value="option2"
                              :small="args.size === 'small'"
                              :large="args.size === 'large'"
                              :disabled="args.disabled" />`
    })
};

export default meta;
