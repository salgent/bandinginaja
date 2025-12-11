import { createFileRoute } from "@tanstack/react-router";
import Compare from "@/views/compare";

export const Route = createFileRoute("/compare")({
  component: Compare,
});
