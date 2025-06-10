type ButtonProps = {
  children: React.ReactNode;
};

const HeroButton = ({ children }: ButtonProps) => {
  return (
    <button className=" border border-[#f97316]  rounded-xl px-4 py-2 transition duration-500 hover:bg-[#f97316] hover:text-white">
      <span className="flex gap-2">{children}</span>
    </button>
  );
};

export default HeroButton;
