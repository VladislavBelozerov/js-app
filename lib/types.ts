export interface ComponentRequiredProps {
  element: HTMLElement;
}

export type ComponentProps<P = {}> = ComponentRequiredProps & P;

export interface ComponentRequiredInterface {
  destroy?(): void;
}

export type ComponentInterface<I = {}> = ComponentRequiredInterface & I;

export type Component<P = {}, I = {}> = (
  props: ComponentProps<P>,
) => ComponentInterface<I>;

export interface TestComponentProps {
  test: string;
}

export interface ComponentOptions {
  debugMessage?: boolean;
}

export interface ActiveComponent {
  element: HTMLElement;
  name: string;
  interface: ComponentInterface;
  options: ComponentOptions;
}

export type ComponentId = string;

export type ActiveComponents = {
  [key: ComponentId]: ActiveComponent;
};
