export interface ComponentRequiredProps {
  element: HTMLElement;
}

export type ComponentProps<P = {}> = ComponentRequiredProps & P;

export interface ComponentRequiredInterface {
  destroy?(): void;
  name?: string;
}

export type ComponentInterface<I = {}> = ComponentRequiredInterface & I;

export type Component<P = {}, I = {}> = (
  props: ComponentProps<P>,
) => ComponentInterface<I>;

export interface TestComponentProps {
  test: string;
}

const TestComponent = (props: ComponentProps<TestComponentProps>) => {
  console.log(props.element);

  return {
    destroy: () => {},
    update() {},
  };
};

export default TestComponent as Component<
  TestComponentProps,
  ReturnType<typeof TestComponent>
>;
