type Props = {
  result: number;
};

export default function ResultContainer(props: Props) {
  const { result } = props;

  return <h2 className="ResultContainer">{result}</h2>;
}
