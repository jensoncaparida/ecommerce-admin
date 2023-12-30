interface HeadingProps {
  title: string;
  description: string;
}

export const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
