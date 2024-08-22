export function formatTime(timeString: string | number | Date) {
  const date = new Date(timeString);
  const now = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "2-digit",
    day: "2-digit", // Added day to show the correct date
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  if (date.toDateString() === now.toDateString()) {
    // Today's show
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  } else if (
    date.toDateString() ===
    new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString()
  ) {
    // Tomorrow's show
    return (
      "Tom " +
      date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    );
  } else {
    // Rest of the shows
    return date.toLocaleDateString([], options);
  }
}

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
