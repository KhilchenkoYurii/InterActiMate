import { ReactElement } from "react";

export interface IRoute {
  path: string;
  component: ReactElement;
  hasHeader?: boolean;
  isGuarded?: boolean;
}