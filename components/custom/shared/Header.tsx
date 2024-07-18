type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <div className="px-7 py-4 bg-slate-100 dark:bg-stone-800">
      <h1 className="font-sans font-semibold">{title}</h1>
    </div>
  );
};

export default Header;
