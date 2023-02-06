import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    window.api.ping();

    window.api.onPingSuccess((message: string) => {
      setMessage(message);
    });
  }, []);

  return (
    <main>
      <h1 id="title">Electron Skeleton</h1>
      <p id="message">{message}</p>
    </main>
  );
}
