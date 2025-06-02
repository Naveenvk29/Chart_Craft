import React, { use, useEffect, useRef, useState } from "react";
import { useMonitorUseractivityQuery } from "../../redux/api/adminApi";
import { motion, scale, useInView } from "framer-motion";
import {
  LogInIcon,
  LogOutIcon,
  UserCheck,
  Edit3,
  UserSearch,
  UserCogIcon,
} from "lucide-react";
import { formatDistanceToNow, isValid } from "date-fns";

const AnimatedItem = ({ children, index }) => {
  const ref = useRef(null);

  const inView = useInView(ref, { amount: 0.5, tiggerOnce: false });

  return (
    <motion.div
      className="mb-3"
      ref={ref}
      initial={{
        scale: 0.95,
        opacity: 0,
      }}
      animate={
        inView
          ? {
              scale: 1,
              opacity: 1,
            }
          : {
              scale: 0.95,
              opacity: 0,
            }
      }
      transition={{
        duration: 0.3,
        delay: index * 0.03,
      }}
    >
      {children}
    </motion.div>
  );
};

const actionIcons = {
  LOGIN: <LogInIcon className="text-green-500" size={20} />,
  MODIFY_ROLE: <UserCogIcon className="text-rose-500" size={20} />,
  MODIFY_USER: <Edit3 className="text-yellow-400" size={20} />,
  OAUTH_LOGIN: <UserCheck className="text-blue-400" size={20} />,
};

const UserActivity = () => {
  const [page, setPage] = useState(1);
  const [allActivities, setAllActivities] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState("All");

  const { data, error, isLoading, isFetching } = useMonitorUseractivityQuery({
    page,
    limit: 20,
  });

  const activities = data?.activities || [];

  useEffect(() => {
    if (activities.length === 0) {
      setHasMore(false);
    } else {
      setAllActivities((prev) => [...prev, ...activities]);
    }
  }, [activities]);

  const ref = useRef();
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (inView && !isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  const actionTypes = ["All", ...new Set(allActivities.map((a) => a.action))];

  const filtered = allActivities.filter((a) => {
    const matchesSearch =
      a.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction =
      selectedAction === "All" || a.action === selectedAction;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="max-w-7xl mx-auto p-5 mt-10">
      <div className="bg-neutral-100 p-5 rounded-2xl dark:bg-neutral-800">
        <h2 className="text-3xl font-bold mb-4 text-neutral-800 dark:text-neutral-300 tracking-tight ">
          User Activity Log
        </h2>
        {/* search bar */}

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search activites"
          className="w-full px-4 py-2 bg-neutral-100 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 text-lg"
        />
        <div className="flex flex-wrap gap-2 mb-4">
          {actionTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedAction(type)}
              className={`px-3 py-1 rounded-full text-sm transition-colors my-5 duration-200  ${
                selectedAction === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-neutral-300 dark:bg-neutral-200 dark:text-neutral-700 hover:bg-neutral-600 hover:text-neutral-100 "
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="relative h-[500px] overflow-hidden rounded-lg border border-neutral-300 dark:border-neutral-600 bg-neutral-300 dark:bg-neutral-600">
          <div className="h-full overflow-y-auto p-4 pr-2 space-y-4">
            {isLoading && page === 1 ? (
              <p className="text-blue-400">Loading...</p>
            ) : error ? (
              <p className="text-red-400">Error loading activities</p>
            ) : filtered.length === 0 ? (
              <p className="text-gray-400">No activities found.</p>
            ) : (
              filtered.map((activity, index) => (
                <AnimatedItem key={index} index={index}>
                  <div
                    className=" bg-neutral-50 p-4 rounded-lg shadow-sm border border-neutral-400 
                  hover:bg-neutral-300 transition dark:bg-neutral-700 hover:dark:bg-neutral-800 flex items-center justify-between "
                  >
                    <div className="pt-1 flex justify-center items-center space-x-4">
                      {actionIcons[activity.action] || (
                        <UserCheck
                          className="text-neutral-900 dark:text-neutral-100"
                          size={20}
                        />
                      )}
                      <p className="text-sm text-neutral-400  ">
                        <span className="font-semibold text-neutral-600 dark:text-neutral-100 ">
                          {activity.user?.username || "Unknown User"}
                        </span>{" "}
                        performed{" "}
                        <span className="text-blue-400">{activity.action}</span>
                      </p>
                    </div>

                    <p className="text-md font-normal text-neutral-900 dark:text-neutral-300">
                      {formatDistanceToNow(new Date(activity.time), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </AnimatedItem>
              ))
            )}

            {hasMore && (
              <div
                ref={ref}
                className="py-6 text-center text-neutral-700 dark:text-neutral-200"
              >
                {isFetching ? "Loading more..." : "Scroll to load more"}
              </div>
            )}
          </div>
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-neutral-300  dark:from-neutral-700 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t dark:from-neutral-700 from-neutral-300 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default UserActivity;
