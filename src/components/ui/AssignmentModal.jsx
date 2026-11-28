import { useForm, Controller } from "react-hook-form";
import { useEffect, useId, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { todayISO } from "@/utils/project";

const NO_IDS = new Set();

function useDebounced(value, ms = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

function InfoCard({ label, title, sub }) {
  return (
    <div className="rounded-lg bg-muted px-4 py-3">
      {label && <p className="text-xs text-muted-foreground">{label}</p>}
      <p className="truncate text-sm font-semibold">{title}</p>
      <p className="truncate text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

function EntityCombobox({ id, picker, value, onChange }) {
  const [q, setQ] = useState("");
  const debounced = useDebounced(q.trim());
  const { items, isPending } = picker.useSearch(debounced);

  const exclude = picker.excludeIds ?? NO_IDS;

  // after a pick the input shows the chosen name, so don't filter by it
  const typed = value && q === value.title ? "" : q.trim().toLowerCase();
  const options = items.filter(
    (i) =>
      !exclude.has(i.id) &&
      (!picker.local || !typed || `${i.title} ${i.sub}`.toLowerCase().includes(typed))
  );
  const list =
    value && !options.some((o) => o.id === value.id) ? [value, ...options] : options;

  const emptyText = picker.local
    ? isPending ? "Loading…" : "No results."
    : !debounced ? "Type to search…" : isPending ? "Searching…" : "No results.";

  return (
    <Combobox
      items={list}
      filter={null}
      value={value}
      onValueChange={onChange}
      onInputValueChange={setQ}
      itemToStringLabel={(i) => i.title}
      isItemEqualToValue={(a, b) => a.id === b.id}
    >
      <ComboboxInput
        id={id}
        placeholder={picker.placeholder}
        className="h-10 w-full"
        showClear
        autoFocus
      />
      <ComboboxContent>
        <ComboboxEmpty>{emptyText}</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.id} value={item}>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{item.title}</span>
                <span className="text-xs text-muted-foreground">{item.sub}</span>
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function AssignmentModal({
  title,
  submitLabel,
  picker,
  subject,
  initial = {},
  isPending = false,
  error = "",
  onSubmit,
  onClose,
}) {
  const uid = useId();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      picked: null,
      projectPosition: initial.projectPosition ?? "",
      startDate: initial.startDate ?? todayISO(),
      endDate: initial.endDate ?? "",
    },
  });

  const picked = watch("picked");
  const startDate = watch("startDate");
  const card = subject ?? picked;

  const submit = (data) => {
    onSubmit({
      picked: data.picked,
      projectPosition: data.projectPosition.trim(),
      startDate: data.startDate,
      endDate: data.endDate || null,
    });
  };

  const formError = errors.endDate?.message || error;
  const canSubmit = !isPending && isValid;

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="gap-0 p-6 sm:max-w-xl sm:p-8">
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
          <DialogHeader className="space-y-1.5 pb-1">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {picker?.hint ?? "Update the role and dates for this assignment."}
            </DialogDescription>
          </DialogHeader>

          {picker && (
            <div className="space-y-2">
              <Label htmlFor={`${uid}-picker`}>{picker.label}</Label>
              <Controller
                name="picked"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <EntityCombobox
                    id={`${uid}-picker`}
                    picker={picker}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          )}

          {card && (
            <InfoCard
              label={picker ? `Selected ${picker.label}` : undefined}
              title={card.title}
              sub={card.sub}
            />
          )}

          <div className="space-y-2.5">
            <Label htmlFor={`${uid}-position`}>Project Position</Label>
            <Input
              id={`${uid}-position`}
              placeholder="e.g. Project Manager"
              className="h-10"
              {...register("projectPosition", {
                validate: (v) => v.trim() !== "" || "Position is required",
              })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor={`${uid}-start`}>Start Date</Label>
              <Input
                id={`${uid}-start`}
                type="date"
                className="h-10 dark:[color-scheme:dark]"
                {...register("startDate", {
                  required: "Start date is required",
                  deps: ["endDate"], // re-check end date when start changes
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${uid}-end`}>End Date (optional)</Label>
              <Input
                id={`${uid}-end`}
                type="date"
                min={startDate || undefined}
                className="h-10 dark:[color-scheme:dark]"
                {...register("endDate", {
                  validate: (v, values) =>
                    !v ||
                    !values.startDate ||
                    v >= values.startDate ||
                    "End date can't be before the start date.",
                })}
              />
            </div>
          </div>

          {formError && (
            <p className="text-sm text-red-600 dark:text-red-400">{formError}</p>
          )}

          <Button type="submit" disabled={!canSubmit} className="mt-2 h-11 w-full cursor-pointer">
            {isPending ? "Saving…" : submitLabel}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AssignmentModal;