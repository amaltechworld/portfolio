
type ButtonProps = {
  children: React.ReactNode;
  iconAfter: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const FooterButton = ({children, iconAfter, onClick}: ButtonProps) => {
  return (
    <button className="border border-[#f97316] rounded-xl px-4 py-2 inline-flex gap-2 mt-8 hover:bg-[#f97316] cursor-pointer"
    onClick={onClick}
    >
      <span className=" ">{children}</span>
      {iconAfter && <span> {iconAfter} </span>}
    </button>
  );
}

export default FooterButton