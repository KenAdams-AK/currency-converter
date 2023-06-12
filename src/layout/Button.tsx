import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button(props: Props) {
  const { content, onClick, ...rest } = props;

  return (
    <button className="SwitchButton" type="button" onClick={onClick} {...rest}>
      {content}
    </button>
  );
}
