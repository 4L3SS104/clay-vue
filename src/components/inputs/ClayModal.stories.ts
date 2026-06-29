import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayModal from "./ClayModal.vue";

interface StoryArgs {
    open: boolean;
    title: string;
    elevation: "none" | "low" | "default" | "high";
    glass: boolean;
    backgroundUrl: string;
}

const meta: Meta<StoryArgs> = {
    title: "Inputs/ClayModal",
    component: ClayModal,
    tags: ["autodocs"],
    argTypes: {
        open: {
            name: "Open",
            type: { name: "boolean", required: false },
            description: "Controls the visibility of the modal.",
            table: {
                category: "Component's",
                defaultValue: { summary: "default" },
                type: { summary: "boolean" }
            },
            control: "boolean"
        },
        title: {
            name: "Title",
            type: { name: "string", required: false },
            description: "The title displayed at the top of the modal.",
            table: {
                category: "Component's",
                defaultValue: { summary: "" },
                type: { summary: "string" }
            },
            control: "text"
        },
        elevation: {
            name: "Elevation",
            type: { name: "string", required: false },
            description: "The elevation of the inner ClayCard.",
            table: {
                category: "Component's",
                defaultValue: { summary: "default" },
                type: { summary: "none | low | default | high" }
            },
            control: {
                type: "select",
                labels: {
                    none: "None",
                    low: "Low",
                    default: "Default",
                    high: "High"
                }
            },
            options: ["none", "low", "default", "high"]
        },
        glass: {
            name: "Glass",
            type: { name: "boolean", required: false },
            description: "Applies a glassmorphism effect to the inner ClayCard.",
            table: {
                category: "Component's",
                defaultValue: { summary: "default" },
                type: { summary: "boolean" }
            },
            control: "boolean"
        },
        backgroundUrl: {
            name: "Background URL",
            type: { name: "string", required: false },
            description: "URL for a background image on the modal overlay.",
            table: {
                category: "Component's",
                defaultValue: { summary: "" },
                type: { summary: "string" }
            },
            control: "text"
        }
    },
    args: {
        open: true,
        title: "Titolo della Modale",
        elevation: "default",
        glass: false,
        backgroundUrl: ""
    }
};

export default meta;

export const Default: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayModal },
        setup: () => ({ args }),
        template: `
            <ClayModal v-bind="args">
                <p>Questo è un esempio di testo all'interno della modale.</p>
                <button>Chiudi</button>
            </ClayModal>
        `

    }),
    args: {
        open: true,
        title: "Modale di Esempio",
        elevation: "default",
        glass: false,
        backgroundUrl: ""
    }
};

export const Glass: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayModal },
        setup: () => ({ args }),
        template: `
            <ClayModal v-bind="args">
                <p>Questa modale ha un'immagine di sfondo e un effetto vetro.</p>
                <button>Chiudi</button>
            </ClayModal>
            `

    }),
    args: {
        open: true,
        title: "Modale con Sfondo e Vetro",
        elevation: "default",
        glass: true,
        backgroundUrl: "https://picsum.photos/1920/1080"
    }
};
