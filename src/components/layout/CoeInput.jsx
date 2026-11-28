import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/form-field";
import { useCoePreview } from "@/hooks/useHr";
import { useEffect } from "react";

const FIELDS = [
  { name: "referenceNumber", label: "Reference no.", maxLength: 50 },
  { name: "coeNumber", label: "COE no.", maxLength: 50 },
  { name: "startDate", label: "Start date (optional)", type: "date" },
  { name: "endDate", label: "End date (optional)", type: "date" },
  { name: "nameInitial", label: "Initials", maxLength: 30 },
];

function CoeWorkspace({ employeeNumber }) {
  const form = useForm({
    defaultValues: {
      referenceNumber: "",
      coeNumber: "",
      startDate: "",
      endDate: "",
      nameInitial: "",
    },
  });

  const v = form.watch();
  const body = {
    startDate: v.startDate || null,
    endDate: v.endDate || null,
    referenceNumber: v.referenceNumber.trim(),
    coeNumber: v.coeNumber.trim(),
    footerLogo: null,
    nameInitial: v.nameInitial.trim() || null,
  };

  const ready = Boolean(body.referenceNumber && body.coeNumber && body.nameInitial);
  const { url, isPending, error, generate } = useCoePreview(employeeNumber);

  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => generate(body), 1200);
    return () => clearTimeout(t);
  }, [
    ready,
    body.startDate,
    body.endDate,
    body.referenceNumber,
    body.coeNumber,
    body.nameInitial,
  ]);

  const firstError = error?.data?.errors?.[0];
  const errorMessage = firstError
    ? `${firstError.field}: ${firstError.defaultMessage}`
    : error
      ? `Couldn't generate the preview ${error.status ? `(${error.status})` : ""}: ${error.message}`
      : null;

  return (
    <>
      <DialogHeader className="flex-row items-center justify-between border-b border-zinc-400 px-4 py-3 pr-12 text-left dark:border-zinc-700">
        <div>
          <DialogTitle>Certificate of Employment</DialogTitle>
          <DialogDescription className="sr-only">
            Preview the certificate and edit its details.
          </DialogDescription>
        </div>
      </DialogHeader>

      <div className="min-h-0 flex-1 overflow-y-auto lg:overflow-hidden">
        <div className="grid gap-4 p-4 lg:h-full lg:grid-cols-[1fr_380px]">
          <section className="relative h-[70vh] overflow-hidden rounded-md border bg-zinc-300 lg:h-full dark:bg-muted">
            {url ? (
              <iframe src={url} title="COE preview" className="h-full w-full" />
            ) : (
              <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-foreground">
                Fill in the reference no., COE no. and initials to see the preview.
              </div>
            )}
            {isPending && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                <Loader2 className="size-6 animate-spin" />
              </div>
            )}
          </section>

          <aside className="mt-0.5">
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                if (ready && !isPending) generate(body);
              }
            }>
              <FieldGroup>
                {FIELDS.map(({ name, label, type = "text", maxLength }) => (
                  <Field key={name}>
                    <FieldLabel htmlFor={name}>{label}</FieldLabel>
                    <Input 
                      id={name} 
                      type={type} 
                      maxLength={maxLength} 
                      {...form.register(name)} 
                      className="border-zinc-400 bg-zinc-50 shadow-sm dark:border-input dark:bg-input/30"
                    />
                  </Field>
                ))}
              </FieldGroup>
              {errorMessage && <p className="mt-3 text-sm text-destructive">{errorMessage}</p>}
              {/* 
              <Button type="submit" className="mt-4 w-full cursor-pointer" disabled={!ready || isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" /> Generating...
                  </>
                ) : (
                  "Generate preview"
                )}
              </Button> 
              */}
            </form>
          </aside>
        </div>
      </div>
    </>
  );
}

function CoeInput({ open, onOpenChange, employeeNumber }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-dvh w-screen max-w-none flex-col gap-0 rounded-none p-0 sm:max-w-none">
        <CoeWorkspace employeeNumber={employeeNumber} />
      </DialogContent>
    </Dialog>
  );
}

export default CoeInput;