"use client";

import { useFormContext } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  label?: string;
  loadingLabel?: string;
}

export function SubmitButton({
  label = "Simpan",
  loadingLabel = "Menyimpan...",
}: SubmitButtonProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isSubmitting ? loadingLabel : label}
    </Button>
  );
}
