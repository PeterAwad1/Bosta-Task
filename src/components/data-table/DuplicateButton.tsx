import { Copy } from 'lucide-react';

import Spinner from '../shared/loaders/Spinner';
import { Button } from '../ui/button';

const DuplicateButton = ({
  onDuplicate,
  isDuplication,
}: {
  onDuplicate: VoidFunction;
  isDuplication: boolean;
}) => {
  return (
    <Button
      onClick={onDuplicate}
      className='hover:!bg-primary-400/80 flex size-8 items-center justify-center rounded-sm bg-primary-400 text-white'
    >
      {isDuplication ? <Spinner /> : <Copy size={18} />}
    </Button>
  );
};

export default DuplicateButton;
