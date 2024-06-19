import React, {useEffect, useState} from 'react';
import './AuthModal.css';

const AuthModal = () => {
    const [isModalOpen, setisModalOpen] = useState(false);
    const [isMenuOpen, setisMenuOpen] = useState(false);
    const [authType, setAuthType] = useState("signIn");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [isLazy, setIsLazy] = useState(null);

    const openModal = () => {
        setisModalOpen(true);
    };

    const closeModal = () => {
        setisModalOpen(false);
        setAuthType("signIn");
    };

    const register = async (e) => {
        try {
            let register_response = await fetch(
                "/api/user.registration",
                {
                    method: "POST",
                    body: JSON.stringify({
                        username: email,
                        password: password
                    }),
                    headers: {
                        "Content-type": "application/json"
                    }
                }
            );

            let response_data = await register_response.json()
            if (register_response.status === 200) {
                localStorage.setItem('userIsLazy', response_data.data.is_lazy);
            }

            let a = 1
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    const check_is_lazy = async () => {
        const user_current_response = await fetch(
            "/api/user.current",
        )
        const data = await user_current_response.json();

        localStorage.setItem('userId', data.data.id);
        localStorage.setItem('userIsLazy', data.data.is_lazy);
    }

    useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    async function getIsLazy() {
        const user_current_response = await fetch(
            "/api/user.current",
        )
        const data = await user_current_response.json();

        localStorage.setItem('userId', data.data.id);
        localStorage.setItem('userIsLazy', data.data.is_lazy);

        setIsLazy(data.data.is_lazy)
    };

    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (isLazy === null) {
        getIsLazy();
    }
  }, []);


    const login = async (e) => {
        try {
            let login_response = await fetch(
                "/api/user.login",
                {
                    method: "POST",
                    body: JSON.stringify({
                        username: email,
                        password: password
                    }),
                    headers: {
                        "Content-type": "application/json"
                    }
                }
            );

            let response_data = await login_response.json()
            if (login_response.status === 200) {
                localStorage.setItem('userIsLazy', response_data.data.is_lazy);
            }
            let a = 1
            // localStorage.setItem('sessionid', loginResponse.data.sessionid); // Сохранить sessionid в localStorage
            // history.push('/'); // Перенаправление на главную страницу после успешной авторизации/регистрации
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    const openMenu = () => {
        if (isMenuOpen) {
            setisMenuOpen(false);
        } else {
            setisMenuOpen(true);
        }
    }

    const handleAuthTypeClick = (type) => {
        setAuthType(type);
    };

    return (
        <>
            <div className="header__auth">
                <div className="auth__links">
                    {isLazy === undefined && (
                        <div className="link__signin" onClick={openModal}>
                            Войти
                        </div>
                    )}
                    {isLazy != undefined && !isLazy && (
                        <>
                            <div className="header__toggle" onClick={openMenu}>
                                <div className="profile__icon"><img alt="avatar"
                                                                    src="/default_avatar.jpg"
                                                                    />
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star"
                                         className="svg-inline--fa fa-star " role="img"
                                         xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 576 512">
                                        <path fill="currentColor"
                                              d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                    </svg>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {isMenuOpen && (
                <>
                    <div
                        className="rc-dropdown header_dropdown_items rc-dropdown-placement-bottomRight snipcss-VlBJ1 style-4S4VF"
                        id="style-4S4VF">
                        <div data-dropdown-inject="true" className="sc-27d721e4-0 diwMYY"><a href="/profile"
                                                                                             className="">
                            <div className="sc-27d721e4-1 kELiVg">Профиль</div>
                        </a>
                            <div className="sc-27d721e4-1 kELiVg">Выйти</div>
                        </div>
                    </div>
                </>
            )}


            {isModalOpen && (
                <>
                    <div className="ReactModal__Overlay ReactModal__Overlay--after-open snipcss-VeXVY style-2CQkf"
                         id="style-2CQkf">
                        <div className="ReactModal__Content ReactModal__Content--after-open style-UAaCn" tabIndex="-1"
                             role="dialog"
                             aria-modal="true" id="style-UAaCn">
                            <div className="info-modal">
                                <button className="close-modal" onClick={closeModal}>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                                         className="svg-inline--fa fa-xmark close-modal__icon" role="img"
                                         xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 384 512">
                                        <path fill="currentColor"
                                              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
                                    </svg>
                                </button>
                                <div className="modal__wrapper">
                                    {authType === 'signUp' && (
                                        <>
                                            <div className="title" data-testid="info-modal-title">Регистрация</div>
                                            <div className="sc-edce251-0 ehhlUV"
                                                 style={{height: "var(--indent-l)"}}></div>
                                            <div className="main">
                                                <div className="auth-modal">
                                                    <div className="auth-local">
                                                        <div className="auth-form"
                                                             data-testid="register-form-container">
                                                            <form data-testid="register-form" onSubmit={register}>
                                                                {/*<div className="input-group"><input type="email" placeholder="Email"*/}
                                                                <div className="input-group"><input placeholder="Email"
                                                                                                    data-testid="register-form-email-input"
                                                                                                    name="email"
                                                                                                    className="sc-3a3d6da-0 euvyga"
                                                                                                    required={true}
                                                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                    // value=""/>
                                                                />
                                                                    <div height="var(--indent-xs)"
                                                                         className="sc-edce251-0 hSLcIi"></div>
                                                                    <div className="valid-error"
                                                                         data-testid="register-form-email-input-error"></div>
                                                                </div>
                                                                <div height="var(--indent-m)"
                                                                     className="sc-edce251-0 iAMgQU"></div>
                                                                <div className="input-group"><input type="password"
                                                                                                    placeholder="Пароль"
                                                                                                    data-testid="register-form-password-input"
                                                                                                    name="password"
                                                                                                    className="sc-3a3d6da-0 euvyga"
                                                                                                    onChange={(e) => setPassword(e.target.value)}
                                                                                                    required={true}
                                                                    // value=""/>
                                                                />
                                                                    <div height="var(--indent-xs)"
                                                                         className="sc-edce251-0 hSLcIi"></div>
                                                                    <div className="valid-error"
                                                                         data-testid="register-form-password-input-error"></div>
                                                                </div>
                                                                <div height="var(--indent-l)"
                                                                     className="sc-edce251-0 ehhlUV"></div>
                                                                <div className="login-btn">
                                                                    <button type="submit" kind="primary" shape="rounded"
                                                                            data-testid="register-form-submit-button"
                                                                            className="sc-ac123477-0 dFMpRu custom-auth-button style-RX74V"
                                                                            disabled=""

                                                                            id="style-RX74V">
                                                                        {/* запрос на регистрацию */}
                                                                        <div kind="primary"
                                                                             className="sc-ac123477-2 jJuENG">
                                                                            <div
                                                                                className="sc-ac123477-5 iEnqmq style-nNqFp"
                                                                                id="style-nNqFp">Создать аккаунт
                                                                            </div>
                                                                        </div>
                                                                    </button>
                                                                    <div height="var(--indent-m)"
                                                                         className="sc-edce251-0 iAMgQU"></div>
                                                                    <div className="switch-form-container">Уже есть
                                                                        аккаунт?
                                                                        <div width="var(--indent-xs)"
                                                                             className="sc-edce251-0 khsHpT"></div>
                                                                        <button type="button" kind="link"
                                                                                shape="rounded"
                                                                                className="sc-ac123477-0 custom-auth-button switch-form-button"
                                                                                data-testid="register-form-switch-button"
                                                                                onClick={() => handleAuthTypeClick('signIn')}>
                                                                            <div kind="link"
                                                                                 className="sc-ac123477-2 isesWM">
                                                                                <div
                                                                                    className="sc-ac123477-5 iEnqmq  style-wPqO7"
                                                                                    id="style-wPqO7">Войти
                                                                                </div>
                                                                            </div>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sc-edce251-0 ehhlUV"></div>
                                                <div className="auth-split"><span className="text">ИЛИ</span></div>
                                                <div className="sc-edce251-0 ehhlUV"></div>
                                                <div className="social-buttons"><a href="http://127.0.0.1:8000/api/login/vk-oauth2">
                                                    <div className="social-button social-button_vk"></div>
                                                </a></div>
                                                <div className="sc-edce251-0 ehhlUV"></div>
                                                <div className="terms-of-use">
                                                    Продолжая, вы соглашаетесь с<br/><a href="/ru/terms-of-use">пользовательским
                                                    соглашением</a>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {authType === 'signIn' && (
                                        <>
                                            <div className="title" data-testid="info-modal-title">Вход</div>
                                            <div className="sc-edce251-0 ehhlUV"
                                                 style={{height: "var(--indent-l)"}}></div>
                                            <div className="main">
                                                <div className="auth-modal">
                                                    <div className="auth-local">
                                                        <div className="auth-form"
                                                             data-testid="register-form-container">
                                                            <form data-testid="register-form" onSubmit={login}>
                                                                {/*<div className="input-group"><input type="email" placeholder="Email"*/}
                                                                <div className="input-group"><input placeholder="Email"
                                                                                                    data-testid="register-form-email-input"
                                                                                                    name="email"
                                                                                                    className="sc-3a3d6da-0 euvyga"
                                                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                                                    required={true}
                                                                    // value=""/>
                                                                />
                                                                    <div height="var(--indent-xs)"
                                                                         className="sc-edce251-0 hSLcIi"></div>
                                                                    <div className="valid-error"
                                                                         data-testid="register-form-email-input-error"></div>
                                                                </div>
                                                                <div height="var(--indent-m)"
                                                                     className="sc-edce251-0 iAMgQU"></div>
                                                                <div className="input-group"><input type="password"
                                                                                                    placeholder="Пароль"
                                                                                                    data-testid="register-form-password-input"
                                                                                                    name="password"
                                                                                                    className="sc-3a3d6da-0 euvyga"
                                                                                                    onChange={(e) => setPassword(e.target.value)}
                                                                                                    required={true}
                                                                    // value=""/>
                                                                />
                                                                    <div height="var(--indent-xs)"
                                                                         className="sc-edce251-0 hSLcIi"></div>
                                                                    <div className="valid-error"
                                                                         data-testid="register-form-password-input-error"></div>
                                                                </div>
                                                                <div height="var(--indent-l)"
                                                                     className="sc-edce251-0 ehhlUV"></div>
                                                                <div className="login-btn">
                                                                    <button type="submit" kind="primary" shape="rounded"
                                                                            data-testid="register-form-submit-button"
                                                                            className="sc-ac123477-0 dFMpRu custom-auth-button style-RX74V"
                                                                            disabled=""
                                                                            id="style-RX74V">
                                                                        {/* запрос на логин */}
                                                                        <div kind="primary"
                                                                             className="sc-ac123477-2 jJuENG">
                                                                            <div
                                                                                className="sc-ac123477-5 iEnqmq style-nNqFp"
                                                                                id="style-nNqFp">Войти
                                                                            </div>
                                                                        </div>
                                                                    </button>
                                                                    <div height="var(--indent-m)"
                                                                         className="sc-edce251-0 iAMgQU"></div>
                                                                    <div className="switch-form-container">Нет аккаунта?
                                                                        <div width="var(--indent-xs)"
                                                                             className="sc-edce251-0 khsHpT"></div>
                                                                        <button type="button" kind="link"
                                                                                shape="rounded"
                                                                                className="sc-ac123477-0 custom-auth-button switch-form-button"
                                                                                data-testid="register-form-switch-button"
                                                                                onClick={() => handleAuthTypeClick('signUp')}>
                                                                            <div kind="link"
                                                                                 className="sc-ac123477-2 isesWM">
                                                                                <div
                                                                                    className="sc-ac123477-5 iEnqmq style-wPqO7"
                                                                                    id="style-wPqO7">Создать
                                                                                </div>
                                                                            </div>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sc-edce251-0 ehhlUV"></div>
                                                <div className="auth-split"><span className="text">ИЛИ</span></div>
                                                <div className="sc-edce251-0 ehhlUV"></div>
                                                <div className="social-buttons"><a href="http://127.0.0.1:8000/api/login/vk-oauth2">
                                                    <div className="social-button social-button_vk"></div>
                                                </a></div>
                                                <div className="sc-edce251-0 ehhlUV"></div>
                                                <div className="terms-of-use">
                                                    Продолжая, вы соглашаетесь с<br/><a href="/ru/terms-of-use">пользовательским
                                                    соглашением</a>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
export default AuthModal;