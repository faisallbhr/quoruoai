import { Circle } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-dvh">
      <Circle className="animate-spin text-muted-foreground" />
    </div>
  );
};

export default Loading;
