import Icon from '../Icon';

type RemoveWarningProps = {
  title: string;
  details: string[];
};
const RemoveWarning = ({ title, details }: RemoveWarningProps) => {
  return (
    <div>
      <div className='flex items-center gap-x-2'>
        <Icon name='alart' />
        <p className='text-lg font-semibold text-error-500'>{title}</p>
      </div>
      <ul className='mt-2 list-inside list-disc text-secondary-400'>
        {details.map((detail, index) => (
          <li key={'warning' + index}>{detail}</li>
        ))}
      </ul>
    </div>
  );
};

export default RemoveWarning;
