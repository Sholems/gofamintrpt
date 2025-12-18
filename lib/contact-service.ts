// Contact Message Service
export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const STORAGE_KEY = 'gofamintrpt_contact_messages';

export class ContactService {
  static getAllMessages(): ContactMessage[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static addMessage(message: Omit<ContactMessage, 'id' | 'timestamp' | 'read'>): ContactMessage {
    const newMessage: ContactMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false
    };

    const messages = this.getAllMessages();
    messages.unshift(newMessage); // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    return newMessage;
  }

  static markAsRead(id: string): void {
    const messages = this.getAllMessages();
    const message = messages.find(m => m.id === id);
    if (message) {
      message.read = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }

  static deleteMessage(id: string): void {
    const messages = this.getAllMessages().filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }

  static getUnreadCount(): number {
    return this.getAllMessages().filter(m => !m.read).length;
  }
}
