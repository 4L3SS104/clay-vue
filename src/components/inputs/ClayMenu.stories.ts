import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ClayMenu from "./ClayMenu.vue";
import type { ClayMenuItem } from "./ClayMenu.vue";

interface StoryArgs
{
    size: "small" | "default" | "large";
    items: ClayMenuItem[];
}

const meta: Meta<StoryArgs> = {
    title: "Inputs/ClayMenu",
    component: ClayMenu,
    tags: ["autodocs"],
    argTypes: {
        size: {
            name: "Size",
            type: { name: "string", required: false },
            description: "The size of the menu.",
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
        items: {
            name: "Items",
            description: "The list of entries to render in the menu.",
            table: {
                category: "Component's",
                type: { summary: "ClayMenuItem[]" }
            },
            control: { type: "object" }
        }
    },
    args: { size: "default" }
};

export const Default: StoryObj<StoryArgs> = {
    args: {
        items: [
            { label: "Item 1", value: "1" },
            { label: "Item 2", value: "2" },
            { label: "Item 3", value: "3" }
        ]
    },
    render: (args) => ({
        components: { ClayMenu },
        setup: () => ({ args }),
        template: `
            <ClayMenu :items="args.items"
                      :small="args.size === 'small'"
                      :large="args.size === 'large'"
                      style="margin: 2rem auto;"
                      @select="(value) => console.log('select', value)" />
        `
    })
};

export const WithLinksAndDisabled: StoryObj<StoryArgs> = {
    args: {
        items: [
            { label: "Open website", href: "https://byloth.dev", target: "_blank" },
            { label: "Settings", value: "settings" },
            { label: "Delete (disabled)", value: "delete", disabled: true }
        ]
    },
    render: (args) => ({
        components: { ClayMenu },
        setup: () => ({ args }),
        template: `
            <ClayMenu :items="args.items"
                      :small="args.size === 'small'"
                      :large="args.size === 'large'"
                      style="margin: 2rem auto;" />
        `
    })
};

export default meta;
