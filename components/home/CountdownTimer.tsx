import { useEffect, useState } from "react";

export const CountdownTimer = ({ circularTimer = false }: any) => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2024-01-25T00:00:00");
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference < 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return circularTimer ? (
    <div className="text-black flex mt-8 gap-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className="flex flex-col w-14 h-14 bg-white items-center justify-center rounded-full"
        >
          <span className="text-md font-bold">
            {value < 10 ? `0${value}` : value}
          </span>
          <span className="text-[9px] font-[500] capitalize">{unit}</span>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-black flex ml-16">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col">
          <span className="text-xs font-[500] capitalize">{unit}</span>
          <div className="flex items-center">
            <span className="text-3xl font-bold">
              {value < 10 ? `0${value}` : value}
            </span>
            {unit !== "seconds" && (
              <span className="text-2xl mx-3 text-[#E07575]">:</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
