import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import ClayButton from "./ClayButton.vue";

interface StoryArgs
{
    label: string;
    size: "small" | "default" | "large";
    click: () => void;
}

const meta: Meta<StoryArgs> = {
    title: "ClayButton",
    component: ClayButton,
    tags: ["autodocs"],
    argTypes: {
        label: {
            name: "Text",
            type: { name: "string", required: true },
            description: "The text displayed on the button.",
            table: {
                category: "Component's",
                defaultValue: { summary: "Click me!" },
                type: { summary: "string" }
            },
            control: "text"
        },
        size: {
            name: "Size",
            type: { name: "string", required: false },
            description: "The size of the button.",
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
        label: "Click me!",
        size: "default",
        click: fn()
    }
};

export const Primary: StoryObj<StoryArgs> = {
    // args: {
    //     label: "Click me!",
    //     size: "default"
    // },
    render: (args: StoryArgs) => ({
        components: { ClayButton },
        setup: () => ({ args }),
        template: `
            <ClayButton :small="args.size === 'small'"
                        :large="args.size === 'large'">
                {{ args.label }}
            </ClayButton>
        `
    })
};

export const Success: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayButton },
        setup: () => ({ args }),
        template: `
            <ClayButton success
                        // :small="args.size === 'small'"
                        // :large="args.size === 'large'">
                {{ args.label }}
            </ClayButton>
        `
    })
};

export const Warning: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayButton },
        setup: () => ({ args }),
        template: `
            <ClayButton warning
                        // :small="args.size === 'small'"
                        // :large="args.size === 'large'">
                {{ args.label }}
            </ClayButton>
        `
    })
};

export const Info: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayButton },
        setup: () => ({ args }),
        template: `
            <ClayButton info
                        // :small="args.size === 'small'"
                        // :large="args.size === 'large'">
                {{ args.label }}
            </ClayButton>
        `
    })
};

export const Danger: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayButton },
        setup: () => ({ args }),
        template: `
            <ClayButton danger
                        // :small="args.size === 'small'"
                        // :large="args.size === 'large'">
                {{ args.label }}
            </ClayButton>
        `
    })
};

export const Glass: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayButton },
        setup: () => ({ args }),
        template: `
            <div style="background-color: #1a1a2e;
                        background-image:
                            radial-gradient(40rem 40rem at 15% 20%, #ff6b6b 0%, transparent 60%),
                            radial-gradient(35rem 35rem at 85% 25%, #4ecdc4 0%, transparent 55%),
                            radial-gradient(45rem 45rem at 50% 95%, #ffd93d 0%, transparent 55%),
                            radial-gradient(30rem 30rem at 80% 90%, #845ec2 0%, transparent 60%);
                        padding: 4rem;">
                <ClayButton glass
                            :small="args.size === 'small'"
                            :large="args.size === 'large'">
                    {{ args.label }}
                </ClayButton>
            </div>
        `
    })
};

export default meta;
