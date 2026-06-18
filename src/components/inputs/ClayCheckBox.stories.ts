import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ClayCheckBox from "./ClayCheckBox.vue";

interface StoryArgs
{
    label: string;
}

const meta: Meta<StoryArgs> = {
    title: "Inputs/ClayCheckBox",
    component: ClayCheckBox,
    tags: ["autodocs"],
    argTypes: {
        label: {
            name: "Label",
            type: { name: "string", required: false },
            description: "The label displayed next to the checkbox.",
            table: {
                category: "Component's",
                defaultValue: { summary: "" },
                type: { summary: "string" }
            },
            control: "text"
        }
    },
    args: {
        label: "I agree to the terms and conditions"
    },
    parameters: {
        docs: {
            description: {
                component: "A simple checkbox component. Click to toggle between checked and unchecked states."
            }
        }
    }
};

export const Default: StoryObj<StoryArgs> = {
    render: (args) => ({
        components: { ClayCheckBox },
        setup: () => ({ args }),
        template: `<ClayCheckBox id="terms" :label="args.label" />`
    })
};

export default meta;
