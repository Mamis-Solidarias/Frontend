import { useState } from 'react';
import { defaultEdition, MochiEdition, MochiEditionLoaded } from 'src/types/campaigns/MochiEdition';

export const useModifyMochi = (entryMochi?: MochiEdition | MochiEditionLoaded | null) => {
  const [mochiEdition, setMochiEdition] = useState<MochiEdition | MochiEditionLoaded>(
    !!entryMochi ? entryMochi : defaultEdition
  );

  const setMochiEditionField = (field: keyof MochiEdition | keyof MochiEditionLoaded, value: any) => {
    setMochiEdition(oldEdition => ({ ...oldEdition, ...{ [field]: value } }));
  };

  return { mochiEdition, setMochiEdition, setMochiEditionField };
};
