import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../firebase/config"

const LoginPage = ({setIsAuth}) => {
    //butona tıklanınca
    const handleClick = () => {
        signInWithPopup(auth, provider)
        //başarıyla giriş yaparsa
        .then((data) => {
        // kullanıcının yetkisini true ya çeker
        setIsAuth(true)

        //kullanıcının tokenini lokale kaydet
        localStorage.setItem('TOKEN', data.user.refreshToken);
    });
    }
    return (
        <div className="container">
            <div className="login">
                <h1>Chat Odası</h1>
                <p>Devam Etmek için Giriş Yapın</p>
                <button onClick={handleClick}>
                    <img src="g-logo.png" alt="" />
                    <span>Google ile Gir</span>
                </button>
            </div>
        </div>
    )
}

export default LoginPage
