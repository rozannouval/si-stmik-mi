"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

interface TextareaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
}

export function TextareaField({
  name,
  label,
  placeholder,
  disabled,
  rows = 3,
}: TextareaFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Textarea
            {...field}
            id={name}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            aria-invalid={fieldState.invalid}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
