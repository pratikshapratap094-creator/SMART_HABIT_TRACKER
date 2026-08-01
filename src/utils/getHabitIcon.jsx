import {
  FaBookOpen,
  FaDumbbell,
  FaTint,
  FaLaptopCode,
  FaBicycle,
  FaAppleAlt,
  FaMusic,
  FaLeaf,
  FaMoon,
  FaRunning,
  FaWalking,
  FaBullseye,
  FaHeart,
  FaPrayingHands
} from "react-icons/fa";

function getHabitIcon(habitName) {

  const name = habitName.toLowerCase();

  if (name.includes("read") || name.includes("book") || name.includes("study"))
    return <FaBookOpen />;

  if (name.includes("exercise") || name.includes("gym") || name.includes("workout"))
    return <FaDumbbell />;

  if (name.includes("run"))
    return <FaRunning />;

  if (name.includes("walk"))
    return <FaWalking />;

  if (name.includes("water") || name.includes("drink"))
    return <FaTint />;

  if (
    name.includes("code") ||
    name.includes("coding") ||
    name.includes("program") ||
    name.includes("react") ||
    name.includes("java") ||
    name.includes("python")
  )
    return <FaLaptopCode />;

  if (name.includes("cycle") || name.includes("bike"))
    return <FaBicycle />;

  if (
    name.includes("food") ||
    name.includes("diet") ||
    name.includes("fruit")
  )
    return <FaAppleAlt />;

  if (
    name.includes("music") ||
    name.includes("song") ||
    name.includes("guitar")
  )
    return <FaMusic />;

  if (
    name.includes("garden") ||
    name.includes("plant")
  )
    return <FaLeaf />;

  if (
    name.includes("sleep") ||
    name.includes("bed")
  )
    return <FaMoon />;

  if (
    name.includes("meditation") ||
    name.includes("pray") ||
    name.includes("yoga")
  )
    return <FaPrayingHands />;

  if (
    name.includes("health")
  )
    return <FaHeart />;

  return <FaBullseye />;
}

export default getHabitIcon;