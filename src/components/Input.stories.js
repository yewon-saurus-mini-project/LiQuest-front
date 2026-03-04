import { fn } from "storybook/test";

import Input from "./Input";

export default {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    label: "라벨",
    value: "",
    onChange: fn(),
    type: "text",
    placeholder: "이렇게 입력하세요.",
  },
};

export const Text = {};

export const Textarea = {
  args: {
    type: "textarea",
  },
};
