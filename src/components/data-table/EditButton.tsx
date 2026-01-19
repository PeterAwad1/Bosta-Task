import Icon from '../shared/Icon';
import { SheetTrigger } from '../ui/sheet';

const EditButton = () => {
  return (
    <SheetTrigger asChild>
      <button>
        <Icon
          name='pen'
          fill='#4E413B'
          className='size-6'
        />
      </button>
    </SheetTrigger>
  );
};

export default EditButton;
