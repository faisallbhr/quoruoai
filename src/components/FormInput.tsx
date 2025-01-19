import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface FormInputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type: "text" | "email" | "password";
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: string;
}

const FormInput = <T extends FieldValues>({
  id,
  label,
  type,
  placeholder,
  register,
  error,
}: FormInputProps<T>) => {
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
