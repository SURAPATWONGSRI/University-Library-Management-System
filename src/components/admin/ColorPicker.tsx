import { useEffect, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

interface Props {
  value?: string;
  onPickerChange?: (color: string) => void;
  label?: string;
}

const ColorPicker = ({ value, onPickerChange, label = "Color" }: Props) => {
  const [color, setColor] = useState(value || "#aabbcc");

  useEffect(() => {
    if (value) setColor(value);
  }, [value]);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    if (onPickerChange) onPickerChange(newColor);
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex flex-col gap-4 rounded-md border border-input bg-card/40 p-4">
        <div className="flex justify-center">
          <HexColorPicker
            color={color}
            onChange={handleColorChange}
            className="!w-full max-w-[200px]"
          />
        </div>

        <div className="flex items-center gap-2">
          <div
            className="h-8 w-8 rounded-md border"
            style={{ backgroundColor: color }}
          />
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              #
            </span>
            <HexColorInput
              color={color}
              onChange={handleColorChange}
              className="w-full h-10 rounded-md border bg-background px-8 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              prefixed={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
