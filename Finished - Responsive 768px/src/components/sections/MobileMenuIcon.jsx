import Menu from "../icons/Menu";

function MobileMenuIcon() {
  return (
    <button className="jusitfy-center hidden items-center hover:cursor-pointer max-lg:flex">
      <Menu className="stroke-primary-75 h-7 w-7" width={2} />
    </button>
  );
}

export default MobileMenuIcon;
