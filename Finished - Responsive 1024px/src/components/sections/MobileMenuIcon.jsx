import Menu from "../icons/Menu";

function MobileMenuIcon() {
  return (
    <button className="hidden hover:cursor-pointer max-lg:block">
      <Menu className="stroke-primary-75 h-7 w-7" width={2} />
    </button>
  );
}

export default MobileMenuIcon;
