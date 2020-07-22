import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion } from 'framer-motion';

import { Context } from './Provider';
import { useDimensions } from './dimensions';

let lastOptionsId = 0;

export function DropdownOption({ name, content: Content, backgroundHeight }) {
  const [registered, setRegistered] = useState(false);

  const idRef = useRef(++lastOptionsId);

  const id = idRef.current;
  const [optionHook, optionDimensions] = useDimensions();

  const {
    registerOption,
    updateOptionProps,
    deleteOptionById,
    setTargetId,
    targetId,
  } = useContext(Context);

  useEffect(() => {
    if (!registered && optionDimensions) {
      const WrappedContent = () => {
        const contentRef = useRef();

        useEffect(() => {
          const contentDimensions = contentRef.current.getBoundingClientRect();
          updateOptionProps(id, { contentDimensions });
        }, []);

        return (
          <div ref={contentRef}>
            <Content />
          </div>
        );
      };

      registerOption({
        id,
        optionDimensions,
        optionCenterX: optionDimensions.x + optionDimensions.widthh / 2,
        WrappedContent,
        backgroundHeight,
      });

      setRegistered(true);
    } else if (registered && optionDimensions) {
      updateOptionProps(id, {
        optionDimensions,
        optionCenterX: optionDimensions.x + optionDimensions.widthh / 2,
      });
    }
  }, [
    registerOption,
    id,
    registered,
    optionDimensions,
    updateOptionProps,
    deleteOptionById,
    backgroundHeight,
  ]);

  return (
    <motion.button className="dropdown-option" ref={optionHook}>
      {name}
    </motion.button>
  );
}
