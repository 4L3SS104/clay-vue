import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ClayToast from "./ClayToast.vue";

interface StoryArgs
{
    message: string;
}

const meta: Meta<StoryArgs> = {
    title: "Inputs/ClayToast",
    component: ClayToast,
    tags: ["autodocs"],
    argTypes: {
        message: {
            name: "Message",
            type: { name: "string", required: true },
            description: "The text displayed inside the toast.",
            table: {
                category: "Component's",
                defaultValue: { summary: "Saved successfully!" },
                type: { summary: "string" }
            },
            control: "text"
        }
    },
    args: {
        message: "Saved successfully!"
    }
};

export const Default: StoryObj<StoryArgs> = {
    render: (args) => ({
        components: { ClayToast },
        setup: () => ({ args }),
        template: "<ClayToast>{{ args.message }}</ClayToast>"
    })
};

export default meta;
