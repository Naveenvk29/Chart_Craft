import { useEffect } from "react";
import { useSessionTrackerMutation } from "../../redux/api/usersApi";

const useSessionTracker = (userId) => {
  const [session] = useSessionTrackerMutation();
  useEffect(() => {
    if (!userId) return;

    const startTime = Date.now();

    const reportSession = async () => {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      try {
        await session({ duration });
      } catch (err) {
        console.error("❌ Failed to report session duration:", err);
      }
    };

    window.addEventListener("beforeunload", reportSession);
    return () => {
      reportSession();
      window.removeEventListener("beforeunload", reportSession);
    };
  }, [userId, session]);
};

export default useSessionTracker;
