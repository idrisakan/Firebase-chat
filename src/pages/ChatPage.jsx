import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useEffect, useRef, useState } from "react";
import Message from "../components/Message";


const ChatPage = ({ room, setRoom }) => {
    const [messages, setMessages] = useState([]);
    const lastMsg = useRef();

    // mesaj gönderme fonksiyonu
    const sendMessage = async (e) => {
        e.preventDefault();

        // koleksiyon referansını alma
        const messagesCol = collection(db, 'messages');

        //koleksiyona yeni döküman ekle 
        await addDoc(messagesCol, {
            text: e.target[0].value.trim(),
            room,
            author: {
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                photo: auth.currentUser.photoURL,
            },
            createdAt: serverTimestamp(),
        });
        //imputtu temizle
        e.target.reset();

    };

    // mevcut odada gönderilen mesajları anlık olarak al.
    useEffect(() => {
        // abone olunucak kolleksiyonun referansını al
        const messagesCol = collection(db, 'messages');

        // verileri çekerken kullanılacak sorguyu oluştur
        const q = query(messagesCol, where('room', '==', room), orderBy('createdAt', 'asc'));

        // onSnapshot anlık olarak kolleksiyondaki  değişimleri izler kolleksiyon her değiştiğinde veridğimmiz fonksiyon ile kolleksiyondaki güncel dökümanlara erişiriz
        const unsub = onSnapshot(q, (snapshot) => {
            //verilerin geçici olarak tutulduğu dizi
            const tempMsg = [];

            //dökümanları dön  verilerine eriş
            snapshot.docs.forEach((doc) => tempMsg.push(doc.data()));


            // mesajları state aktar
            setMessages(tempMsg)
        })
        // kullanıcıının sohbet sayfasından ayrılma anında veri çekmeyi sonlandır
        return () => unsub();
    }, []);

// yeni mesaj gönderilme olayını izle

useEffect(() => {
    lastMsg.current?.scrollIntoView({behavior: 'smooth'});
},[messages]);

    return (
        <div className="chat-page">
            <header>
                <p>{auth.currentUser?.displayName}</p>
                <p>{room}</p>
                <button onClick={() => setRoom(null)}>Farklı Oda</button>
            </header>

            <main>
                {messages.length > 0 ?
                     <>
                   { messages.map((data, i) => (
                        <Message data={data} key={i} />
                    ))}
                    <div ref={lastMsg} />
                    </>
                    : <p className="warn"><span>Henüz hiç mesaj gönderilmedi ilk mesajı siz gönderin</span></p>}

            </main>


            <form onSubmit={sendMessage}>
                <input placeholder="mesajınızı yazınız..." type="text" required />
                <button>Gönder</button>
            </form>
        </div>
    )
}

export default ChatPage;
