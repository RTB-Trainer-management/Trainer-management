import { useSelector } from "react-redux";
import TrainerPerformance from "./Performance/TrainerPerformance";
import MyPerformance from "./Performance/MyPerformance";
import Promotion from "./Performance/Promotion";

const Performance = () => {
  const performanceFor = useSelector(state => state.nav.performance);

  if (!performanceFor) {
    return <TrainerPerformance />;
  }

  return (
    <div>
      {performanceFor === "performance" && <TrainerPerformance />}
      {performanceFor === "promotion" && <Promotion />}
      {performanceFor === "my-performance" && <MyPerformance />}
    </div>
  );
};

export default Performance;