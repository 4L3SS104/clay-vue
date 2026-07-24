import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ClayButton from "../ClayButton.vue";
import ClayAura from "./ClayAura.vue";

interface StoryArgs
{
    variant: "default" | "dual" | "rainbow" | "glow";
    size: "small" | "default" | "large";
}

const meta: Meta<StoryArgs> = {
    title: "Inputs/ClayAura",
    component: ClayAura,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            name: "Variant",
            type: { name: "string", required: false },
            description: "The style of the light effect wrapping the content.",
            table: {
                category: "Component's",
                defaultValue: { summary: "default" },
                type: { summary: "default | dual | rainbow | glow" }
            },
            control: {
                type: "select",
                labels: {
                    default: "Default",
                    dual: "Dual",
                    rainbow: "Rainbow",
                    glow: "Glow"
                }
            },
            options: ["default", "dual", "rainbow", "glow"]
        },
        size: {
            name: "Size",
            type: { name: "string", required: false },
            description: "The size of the aura effect.",
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
        variant: "default",
        size: "default"
    }
};

export const Default: StoryObj<StoryArgs> = {
    render: (args) => ({
        components: { ClayAura, ClayButton },
        setup: () => ({ args }),
        template: `
            <ClayAura :variant="args.variant"
                      :small="args.size === 'small'"
                      :large="args.size === 'large'">
                <ClayButton>Aura me!</ClayButton>
            </ClayAura>
        `
    })
};

export default meta;
