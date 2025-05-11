import {
  ActiveComponent,
  ComponentProps,
  Component,
  ActiveComponents,
  ComponentOptions,
} from "../types";
import { kebabCase } from "lodash-es";
import { BASE_APP_NAME } from "./constaints";
import { useIncrement } from "./utils/useIncrement";
import { useLogger } from "./utils/useLogger";

const appIncrement = useIncrement();

const createApp = ({
  root: HTMLElement,
  name = BASE_APP_NAME,
  debug = false,
}) => {
  appIncrement.increment();
  const appId = kebabCase(
    appIncrement.value > 1 ? `${name}-${appIncrement.value++}` : name,
  );

  const componentIncrement = useIncrement(); // Initializing component increment

  const logger = useLogger({ appId, enabled: debug }); // Initializing logger

  const initComponent = <P = {}>(
    component: Component,
    props: ComponentProps<P>,
    { debugMessage = false }: ComponentOptions,
  ): ActiveComponent | Error => {
    const { element } = props;
    const componentName = kebabCase(component.name);
    const _componentName = `${appId}-${componentName}`;

    if (element.hasAttribute(`data-${_componentName}`)) {
      throw new Error(
        `Component ${_componentName} already exists on current element`,
      );
    }

    const componentInterface = component(props);
    const componentId = `${componentCount++}`;
    element.setAttribute(`data-${_componentName}`, componentId);

    const res = {
      name: _componentName,
      interface: componentInterface,
      element: props.element,
      options: { debugMessage },
    };

    activeComponents[componentId] = res;

    if (debugMessage) {
      logger.success(`Initialized component ${_componentName}`);
    }

    return res;
  };

  return {
    initComponent,
  };
};
