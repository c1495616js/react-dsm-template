import { Options as _PopperOptions } from '@popperjs/core';
import { forwardRef, Ref, useImperativeHandle, useState } from 'react';
import { Modifier, usePopper } from 'react-popper';
import { ElementGetter, getElement } from '../../utils/getElement';
import { NativeElementPropsWithoutKeyAndRef } from '../../utils/jsx-types';
import { useComposeRefs } from '../../hooks/useComposeRefs';
import Portal, { PortalProps } from '../Portal/Portal';

export type {
  Placement as PopperPlacement,
  PositioningStrategy as PopperPositionStrategy,
} from '@popperjs/core';

export type PopperOptions<Modifiers> = Omit<
  Partial<_PopperOptions>,
  'modifiers'
> & {
  modifiers?: ReadonlyArray<Modifier<Modifiers>>;
};

export type PopperController = ReturnType<typeof usePopper>;

export interface PopperProps
  extends Pick<PortalProps, 'container' | 'disablePortal'>,
    NativeElementPropsWithoutKeyAndRef<'div'> {
  anchor?: ElementGetter;
  controllerRef?: Ref<PopperController>;
  open?: boolean;
  options?: PopperOptions<any>;
}

const Popper = forwardRef<HTMLDivElement, PopperProps>((props, ref) => {
  const {
    anchor,
    children,
    container,
    controllerRef,
    disablePortal,
    open = false,
    options,
    style,
    ...rest
  } = props;
  const [popperEl, setPopperEl] = useState<HTMLElement | null>(null);
  const composedRef = useComposeRefs([ref, setPopperEl]);
  const anchorEl = getElement(anchor);
  const { attributes, forceUpdate, state, styles, update } = usePopper(
    anchorEl,
    popperEl,
    options
  );

  useImperativeHandle(controllerRef, () => ({
    attributes,
    forceUpdate,
    state,
    styles,
    update,
  }));

  if (!open) {
    return null;
  }

  return (
    <Portal container={container} disablePortal={disablePortal}>
      <div
        {...rest}
        ref={composedRef}
        style={{
          ...style,
          ...styles.popper,
        }}
        {...attributes.popper}
      >
        {children}
      </div>
    </Portal>
  );
});

export default Popper;
