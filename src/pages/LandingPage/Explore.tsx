import { useLocation } from "react-router-dom";

export default function Explore() {
  const location = useLocation();
  console.log(location);
  return <div>Explore</div>;
}
