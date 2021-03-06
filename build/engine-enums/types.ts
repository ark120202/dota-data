import { exportNamespacedRoot } from '../util';

// EXPORT START
export interface EngineEnum {
  name: string;
  members: EngineEnumMember[];
}

export interface EngineEnumMember {
  name: string;
  shortName: string;
}
// EXPORT END

export const types = exportNamespacedRoot(__filename, 'engineEnums', 'engineEnums.EngineEnum[]');
