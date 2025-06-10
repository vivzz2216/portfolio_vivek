import { useEffect, useState } from 'react';
import { apiRequest } from '../lib/queryClient';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await apiRequest('GET', '/api/contact-messages');
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        setError('Failed to load messages');
        console.error('Error fetching messages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <div className="p-4">Loading messages...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold">{message.subject}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  From: {message.name} ({message.email})
                </p>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(message.createdAt).toLocaleString()}
              </p>
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{message.message}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-gray-500">No messages yet.</p>
        )}
      </div>
    </div>
  );
} 