import { createFileRoute } from "@tanstack/react-router";
import Browser from "@/views/browser";

export const Route = createFileRoute("/browser")({
  component: Browser,
});
