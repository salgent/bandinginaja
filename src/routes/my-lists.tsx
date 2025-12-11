import { createFileRoute } from "@tanstack/react-router";
import MyLists from "@/views/my-lists";

export const Route = createFileRoute("/my-lists")({
  component: MyLists,
});
