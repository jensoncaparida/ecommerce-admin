interface SubHeadingProps {
  title: string;
  description: string;
}

export const SubHeading = ({ title, description }: SubHeadingProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <h1 className="text-lg font-bold">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
