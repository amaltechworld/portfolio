
type ButtonProps = {
    children: React.ReactNode;
    iconAfter: React.ReactNode;
}

const FooterButton = ({children, iconAfter}: ButtonProps) => {
  return (
    <button className="border border-[#f97316] rounded-xl px-4 py-2 inline-flex gap- mt-8 hover:bg-[#f97316] cursor-pointer">
      <span className=" ">{children}</span>
      {iconAfter && <span> {iconAfter} </span>}
    </button>
  );
}

export default FooterButton