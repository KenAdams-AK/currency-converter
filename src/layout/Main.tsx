import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Main(props: Props) {
  const { children } = props;

  return <main className="Page">{children}</main>;
}
