import { nanoid } from "nanoid";
import { Home } from "../Pages/Home";
interface useRouterType {
  component: React.FC;
  id: string;
  path?: string;
}

export const Router: useRouterType[] = [
  {
    id: nanoid(),
    component: Home,
  },
];
