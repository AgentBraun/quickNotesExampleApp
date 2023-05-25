import { UseFormRegister } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  register: UseFormRegister<any>;
};

const TextInputField = (props: Props) => {
  return <div>TextInputField</div>;
};

export default TextInputField;
