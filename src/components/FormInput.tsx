import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface FormInputProps {
  id: string;
  label: string;
  type: "text" | "email" | "password";
  placeholder?: string;
  register: any;
  error?: string;
}

const FormInput = ({
  id,
  label,
  type,
  placeholder,
  register,
  error,
}: FormInputProps) => {
  return (
    <div>
      <Label htmlFor={id} className="block mb-2 font-semibold">
        {label}
      </Label>
      <Input id={id} type={type} placeholder={placeholder} {...register(id)} />
      {error && <p className="text-sm mt-1 text-red-500">{error}!</p>}
    </div>
  );
};

export default FormInput;
