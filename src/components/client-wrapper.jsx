import useLenis from "../hooks/useLenis";

export default function ClientWrapper({ children }) {
  useLenis();
  return <>{children}</>;
}
