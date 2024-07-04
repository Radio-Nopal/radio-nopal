import { useEffect, useState, useRef } from 'react';
import {
  getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot,
} from 'firebase/firestore';
import initFirebase from './firebaseConnection';

const useFirebaseChat = (nombreDeEspacio) => {
  initFirebase();
  const db = getFirestore();
  const collectionRef = useRef(collection(
    db,
    `${nombreDeEspacio}-chat`,
  )).current;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const chatQuery = query(collectionRef, orderBy('timestamp', 'asc'), limit(50));

    const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
      const newMessages = [];
      snapshot.forEach((doc) => {
        newMessages.push(doc.data());
      });
      setMessages(newMessages);
    }, (error) => {
      console.error('Error receiving messages:', error);
    });

    return () => unsubscribe();
  }, [collectionRef]);

  const sendChatMessage = async (data) => {
    try {
      await addDoc(collectionRef, data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return { messages, sendChatMessage };
};

export default useFirebaseChat;
