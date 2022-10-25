import { useState } from 'react';
import { Action, defaultAction } from 'src/types/Action';

export const useAction = () => {
  const [action, setAction] = useState<Action>(defaultAction);

  const setCompletion = (complete: boolean): void => {
    setAction(oldAction => ({ ...oldAction, ...{ complete: complete } }));
  };

  const setField = (field: keyof Action, value: any): void => {
    setAction(oldAction => ({ ...oldAction, ...{ [field]: value } }));
  };

  return { action, setAction, setCompletion, setField };
};
