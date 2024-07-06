import { useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../auth/hooks";

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket(
      `${import.meta.env.PROD ? 'wss' : 'ws'}://${import.meta.env.VITE_API_HOST}/cable`,
    );

    socketRef.current.onopen = () => {
      console.log("WebSocket connection established");
      const msg = {
        command: "subscribe",
        identifier: JSON.stringify({
          id: 1,
          channel: "NotificationsChannel",
        }),
      };
      socketRef.current?.send(JSON.stringify(msg));
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "ping") {
        return;
      }

      console.log("Message from server: ", data);

      if (["welcome", "confirm_subscription"].includes(data.type)) {
        return;
      }

      if (user && data.message.user_id !== user.userId) {
        toast.info(
          `${data.message.user_email} has just shared a video: ${data.message.video_title}`,
          {
            onClick() {
              window.location.href = "/";
            },
          },
        );
      }
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    return () => {
      console.log("Closing WebSocket connection");
      socketRef.current?.close();
    };
  }, [user]);

  return (
    <div>
      {children}
      <ToastContainer />
    </div>
  );
};

export default NotificationProvider;
