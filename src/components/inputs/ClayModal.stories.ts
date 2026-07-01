import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayModal from "./ClayModal.vue";

interface StoryArgs {
    open: boolean;
    title: string;
    elevation: "none" | "low" | "default" | "high";
    glass: boolean;
    backgroundUrl: string;

    button1Label: string;
    button1Size: "small" | "default" | "large";
    button1Visible: boolean;
    button2Label: string;
    button2Size: "small" | "default" | "large";
    button2Visible: boolean;
    button3Label: string;
    button3Size: "small" | "default" | "large";
    button3Visible: boolean;
}

const sizeControl = {
    type: "select" as const,
    labels: { small: "Small", default: "Default", large: "Large" }
};
const sizeOptions = ["small", "default", "large"];

const meta: Meta<StoryArgs> = {
    title: "ClayModal",
    component: ClayModal,
    tags: ["autodocs"],
    argTypes: {
        open: {
            name: "Open",
            type: { name: "boolean", required: false },
            description: "Controls the visibility of the modal.",
            table: { category: "Component's",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" } },
            control: "boolean"
        },
        title: {
            name: "Title",
            type: { name: "string", required: false },
            description: "The title displayed at the top of the modal.",
            table: { category: "Component's",
                defaultValue: { summary: "" },
                type: { summary: "string" } },
            control: "text"
        },
        elevation: {
            name: "Elevation",
            type: { name: "string", required: false },
            description: "The elevation of the inner ClayCard.",
            table: { category: "Component's",
                defaultValue: { summary: "default" },
                type: { summary: "none | low | default | high" } },
            control: { type: "select", labels: { none: "None", low: "Low", default: "Default", high: "High" } },
            options: ["none", "low", "default", "high"]
        },
        glass: {
            name: "Glass",
            type: { name: "boolean", required: false },
            description: "Applies a glassmorphism effect to the inner ClayCard.",
            table: { category: "Component's",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" } },
            control: "boolean"
        },
        backgroundUrl: {
            name: "Background URL",
            type: { name: "string", required: false },
            description: "URL for a background image on the modal overlay.",
            table: { category: "Component's",
                defaultValue: { summary: "" },
                type: { summary: "string" } },
            control: "text"
        },

        button1Label: {
            name: "Button 1 — Label",
            type: { name: "string", required: false },
            description: "Label of the first button.",
            table: { category: "Button 1",
                defaultValue: { summary: "" },
                type: { summary: "string" } },
            control: "text"
        },
        button1Size: {
            name: "Button 1 — Size",
            type: { name: "string", required: false },
            description: "Size of the first button.",
            table: { category: "Button 1",
                defaultValue: { summary: "default" },
                type: { summary: "small | default | large" } },
            control: sizeControl,
            options: sizeOptions
        },
        button1Visible: {
            name: "Button 1 — Visible",
            type: { name: "boolean", required: false },
            description: "Whether the first button is visible.",
            table: { category: "Button 1",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" } },
            control: "boolean"
        },

        button2Label: {
            name: "Button 2 — Label",
            type: { name: "string", required: false },
            description: "Label of the second button.",
            table: { category: "Button 2",
                defaultValue: { summary: "" },
                type: { summary: "string" } },
            control: "text"
        },
        button2Size: {
            name: "Button 2 — Size",
            type: { name: "string", required: false },
            description: "Size of the second button.",
            table: { category: "Button 2",
                defaultValue: { summary: "default" },
                type: { summary: "small | default | large" } },
            control: sizeControl,
            options: sizeOptions
        },
        button2Visible: {
            name: "Button 2 — Visible",
            type: { name: "boolean", required: false },
            description: "Whether the second button is visible.",
            table: { category: "Button 2",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" } },
            control: "boolean"
        },

        button3Label: {
            name: "Button 3 — Label",
            type: { name: "string", required: false },
            description: "Label of the third button.",
            table: { category: "Button 3",
                defaultValue: { summary: "" },
                type: { summary: "string" } },
            control: "text"
        },
        button3Size: {
            name: "Button 3 — Size",
            type: { name: "string", required: false },
            description: "Size of the third button.",
            table: { category: "Button 3",
                defaultValue: { summary: "default" },
                type: { summary: "small | default | large" } },
            control: sizeControl,
            options: sizeOptions
        },
        button3Visible: {
            name: "Button 3 — Visible",
            type: { name: "boolean", required: false },
            description: "Whether the third button is visible.",
            table: { category: "Button 3",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" } },
            control: "boolean"
        }
    },
    args: {
        open: true,
        title: "Titolo della Modale",
        elevation: "default",
        glass: false,
        backgroundUrl: "",

        button1Label: "Annulla",
        button1Size: "default",
        button1Visible: false,
        button2Label: "Conferma",
        button2Size: "default",
        button2Visible: false,
        button3Label: "Altro",
        button3Size: "default",
        button3Visible: false
    }
};

export default meta;

export const Default: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayModal },
        setup: () => ({ args }),
        template: `
            <ClayModal v-bind="args">
                <p>Modale con tutti e tre i bottoni visibili.</p>
            </ClayModal>
        `

    }),
    args: {
        button1Label: "Annulla",
        button1Visible: false,
        button2Label: "Salva",
        button2Visible: false,
        button3Label: "Elimina",
        button3Visible: true
    }
};

export const Glass: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayModal },
        setup: () => ({ args }),
        template: `
            <ClayModal v-bind="args">
                <p>Modale con sfondo e effetto vetro.</p>
            </ClayModal>
        `

    }),
    args: {
        glass: true,
        backgroundUrl: "https://picsum.photos/1920/1080",
        button1Label: "Annulla",
        button1Visible: true,
        button2Label: "Conferma",
        button2Visible: true
    }
};

export const LiquidGlass: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayModal },
        setup: () => ({ args }),
        template: `
            <ClayModal v-bind="args">
                <p>Modale con sfondo e effetto vetro.</p>
            </ClayModal>
        `

    }),
    args: {
        glass: true,
        backgroundUrl: "https://picsum.photos/1920/1080",
        button1Label: "Annulla",
        button1Visible: true,
        button2Label: "Conferma",
        button2Visible: true
    }
};
