import { Minus, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

type QuantityControlProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

const QuantityControl = ({
  quantity,
  onDecrease,
  onIncrease,
}: QuantityControlProps) => {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onDecrease}
      >
        <Minus className="h-4 w-4" />
      </Button>

      <span className="min-w-[3rem] text-center font-medium">{quantity}</span>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onIncrease}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantityControl;
