<template>
    <div class="auth-form-wrapper">
        <div class="auth-form">
            <form class="login-form">
                <p class="mb-4">Вход</p>
                <input type="email" placeholder="Email"/>
                <input type="password" value="admin" placeholder="Пароль" readonly/>
                <button>Войти</button>
                <p class="message">Нет регистрации? <a href="#" @click="changeForm">Создать аккаунт</a></p>
            </form>

            <form class="register-form" @submit.prevent="registerUser">
                <p class="mb-4">Регистрация</p>
                <input type="text" required placeholder="Имя" v-model="user.name"/>
                <!--<input type="password" placeholder="Password"/>-->
                <input type="email" required placeholder="Email" v-model="user.email"/>
                <button>Создать</button>
                <p class="message">Уже зарегистрированы? <a href="#" @click="changeForm">Войти</a></p>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AuthForm",
  data() {
    return {
        isRegisterLoading: false,
        user: {
            name: '',
            email: ''
        },
    };
  },
  methods: {
    changeForm() {
        this.$el.classList.toggle('auth-form-wrapper--login');
    },
    async registerUser () {
        try {
            this.isRegisterLoading = true;

            setTimeout(async () => {

                const response = await axios({
                    method: 'post',
                    url: 'https://spiffy-hill-idea.glitch.me/register',
                    data: {
                        name: this.user.name,
                        email: this.user.email,
                        password: 'admin'
                    }
                })

                this.setRegister();
            }, 1000)

        } catch (error) {
            alert('Ошибка');
        }
    },
    setRegister() {
        this.$el.remove();
    }
  },
};
</script>

<style lang="scss" scoped>
.auth-form-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #222222;
    z-index: 2;

    &--login {
        .auth-form .login-form {
            display: block;
        }

        .auth-form .register-form {
            display: none;
        }
    }
}
.auth-form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.auth-form input {
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.auth-form button {
  text-transform: uppercase;
  outline: 0;
  background: #2c2d2d;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.auth-form button:hover,.auth-form button:active,.auth-form button:focus {
  background: #2c2d2d;
}
.auth-form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.auth-form .message a {
  color: #2c2d2d;
  text-decoration: none;
}
.auth-form .login-form {
  display: none;
}

</style>

