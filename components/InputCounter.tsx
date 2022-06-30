import { Minus, Plus } from "phosphor-react";

interface InputCounterProps {
  onChange: (value: number | null) => void;
  value: number | null;
}

export const InputCounter = ({ onChange, value }: InputCounterProps) => {
  const defaultedValue = value ?? 0;

  return (
    <span className="flex px-2 gap-1 bg-slate-100 rounded-sm">
      <button
        aria-label={`Decrease count to ${defaultedValue - 1}`}
        disabled={value === 0}
        onClick={() => onChange(defaultedValue - 1)}
        type="button"
      >
        <Minus size={20} />
      </button>
      <input
        className="
          w-10 appearance-none bg-slate-100 border-0 text-center input-number-no-buttons
          px-1
        "
        min={0}
        step={1}
        type="number"
        placeholder="0"
        value={value ?? ""}
        onChange={(event) => {
          // Only allow positive numbers
          const nextValue = event.target.valueAsNumber;

          // Reset to 0
          if (typeof nextValue !== "number" || isNaN(nextValue)) {
            onChange(null);
          } else {
            onChange(Math.abs(nextValue));
          }
        }}
      />
      <button
        aria-label={`Increase count to ${defaultedValue + 1}`}
        type="button"
        onClick={() => onChange(defaultedValue + 1)}
      >
        <Plus size={20} />
      </button>
    </span>
  );
};
