import { DumpConstant, serverDump } from '../dump';
import { modifierPropertyData } from './data';
import { Kind, ModifierField } from './types';

export { types as modifierPropertyTypes } from './types';

export const modifierPropertyDeclarations: ModifierField[] = serverDump
  .filter((x): x is DumpConstant => x.kind === 'constant')
  .filter((x): x is typeof x & { enum: string } => x.enum === 'modifierfunction')
  .filter((x): x is typeof x & { description: string } => x.description != null)
  .filter(x => x.description !== 'Unused')
  .map(
    (x): ModifierField => {
      const functionName = x.description;
      const enumName = x.name;

      const kind: Kind = enumName.startsWith('MODIFIER_EVENT_') ? 'event' : 'property';
      let data = modifierPropertyData[functionName];
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!data) {
        console.warn(`Untyped modifier field: ${functionName}`);
        data = ['void', 'void'];
      }

      return {
        kind,
        functionName,
        enumName,
        description: data[2],
        argument: data[0],
        returns: data[1],
      };
    },
  );