import { useSelector } from "react-redux";
import TrainerPerformance from "./Performance/TrainerPerformance";
import MyPerformance from "./Performance/MyPerformance";
import Promotion from "./Performance/Promotion";

const Performance = () => {
  const performanceFor = useSelector(state => state.nav.performance);

  if (!performanceFor) {
    return <div className="p-4">Select a performance option from the sidebar.</div>;
  }

  return (
    <div>
      {performanceFor === "trainer" && <TrainerPerformance />}
      {performanceFor === "promotion" && <Promotion />}
      {performanceFor === "my-performance" && <MyPerformance />}
    </div>
  );
};

export default Performance;