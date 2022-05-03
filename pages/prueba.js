import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export default function prueba() {
  return (
    <div>
      <div>
        <CircularProgressbar value={60} text="60%" />
      </div>
    </div>
  );
}
