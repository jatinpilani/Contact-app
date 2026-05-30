import { createContext, useState } from "react";

export const ContactsContext = createContext();

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState([
   { id: '1', name: 'Emma Watson', email: 'emma.w@design.com', phone: '+44 7712345678', category: 'Work', favorite: true },
        { id: '2', name: 'James Rodriguez', email: 'james.r@tech.io', phone: '+1 415 888 2345', category: 'Friend', favorite: false },
        { id: '3', name: 'Dr. Sarah Lin', email: 'sarah.lin@clinic.com', phone: '+86 138 0000 1122', category: 'Work', favorite: true },
        { id: '4', name: 'Robert Frost', email: 'robert.f@family.com', phone: '+1 202 555 0199', category: 'Family', favorite: false },
        { id: '5', name: 'Lisa Wong', email: 'lisa.wong@creative.com', phone: '+61 412 345 678', category: 'Friend', favorite: true },
      ]);

  return (
    <ContactsContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactsContext.Provider>
  );
}