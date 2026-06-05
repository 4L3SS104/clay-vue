import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ClayCheckBox from "./ClayCheckBox.vue";

const meta: Meta = {
    title: "Inputs/ClayCheckBox",
    component: ClayCheckBox,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "A simple checkbox component. Click to toggle between checked and unchecked states."
            }
        }
    }
};

export const Default: StoryObj = {
    render: () => ({
        components: { ClayCheckBox },
        template: "<ClayCheckBox />"
    })
};

export default meta;
