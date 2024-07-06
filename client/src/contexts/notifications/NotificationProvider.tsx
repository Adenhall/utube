import { useEffect, useRef } from "react";

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:3000/cable");

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
      const data = JSON.parse(event.data)

      if (data.type === 'ping') {
        return
      }

      console.log("Message from server: ", data);
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    return () => {
      console.log("Closing WebSocket connection");
      socketRef.current?.close();
    };
  }, []);

  return <div>{children}</div>;
};

export default NotificationProvider;
