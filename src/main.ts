import TestComponent, { type ComponentInterface } from "./testComponent";

const div = document.createElement("div");

const component = TestComponent({ element: div, test: "123" });

component.destroy();

const components: Record<string, ComponentInterface> = {
  test: component,
};

const getComponent = <I>(key: string): ComponentInterface<I> => {
  return components[key] as ComponentInterface<I>;
};

const selectedComponent =
  getComponent<ReturnType<typeof TestComponent>>("test");

selectedComponent.destroy();
selectedComponent.update();
