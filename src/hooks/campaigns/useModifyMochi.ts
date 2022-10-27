import { useState } from 'react';
import { defaultEdition, MochiEdition } from 'src/types/MochiEdition';

export const useModifyMochi = (entryMochi?: MochiEdition | null) => {
  const [mochiEdition, setMochiEdition] = useState<MochiEdition>(!!entryMochi ? entryMochi : defaultEdition);

  const setMochiEditionField = (field: keyof MochiEdition, value: any) => {
    setMochiEdition(oldEdition => ({ ...oldEdition, ...{ [field]: value } }));
  };

  return { mochiEdition, setMochiEdition, setMochiEditionField };
};
