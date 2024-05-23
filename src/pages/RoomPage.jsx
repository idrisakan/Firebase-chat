const RoomPage = ({setIsAuth, setRoom}) => {
//çIKIŞ yap 
    const logout = () => {
// yetki state ini false çek
  setIsAuth(false);

  //lokaldeki kaydı kaldır
  localStorage.removeItem('TOKEN')

    };
    //form gönderilince
    const handleSubmit = (e) => {
        //syfa yenilemyi engelle
        e.preventDefault();
         
        //inputtaki değeri al
        const room = e.target[0].value.trim().toLowerCase();
        //oda ismini state ekle
        setRoom(room);

    };
  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Odası</h1>
      <p>Hangi Odaya Gireceksiniz</p>

      <input placeholder="ör:haftaiçi" type="text" required />

      <button type="submit">Odaya Gir</button>
      <button onClick={logout} type="button">Çıkış Yap</button>
    </form>
  )
}

export default RoomPage;
