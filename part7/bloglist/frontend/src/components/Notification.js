import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notifications.message);
  const type = useSelector((state) => state.notifications.type);

  if (message !== null) {
    if (type === "message") {
      return (
        <div class="container mx-auto max-w-md pt-4">
          <div class="rounded-t bg-green-500 px-4 py-2 font-bold text-white">
            Message
          </div>
          <div class="rounded-b border border-t-0 border-green-400 bg-green-100 px-4 py-3 text-green-700">
            {message}
          </div>
        </div>
      );
    } else {
      return (
        <div class="container mx-auto max-w-md pt-4">
          <div class="rounded-t bg-red-500 px-4 py-2 font-bold text-white">
            Error
          </div>
          <div class="rounded-b border border-t-0 border-red-400 bg-red-100 px-4 py-3 text-red-700">
            {message}
          </div>
        </div>
      );
    }
  }
};

export default Notification;
