import Icon from "./icon";

const Loading = () => {
  return (
    <div className="flex h-96 items-center justify-center">
      <Icon name="loader" className="h-5 w-5 animate-spin text-primary" />
    </div>
  );
};

export default Loading;
