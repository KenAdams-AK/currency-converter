type Props = {
  result: number;
};

export default function ResultContainer(props: Props) {
  const { result } = props;

  return (
    <div className="ResultContainer">
      <span>{result}</span>
    </div>
  );
}
