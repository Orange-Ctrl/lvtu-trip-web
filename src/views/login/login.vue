<template>
  <div class="login">
    <div class="login-box">
      <h2 class="title">登录</h2>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="remember-box">
          <van-checkbox v-model="remember">记住密码</van-checkbox>
        </div>
        <div style="margin: 16px">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            :loading="loading"
          >
            登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import useMainStore from "@/stores/modules/main";
import { login } from "@/services/modules/login";

const router = useRouter();
const mainStore = useMainStore();

const username = ref("");
const password = ref("");
const loading = ref(false);
const remember = ref(false);

// 从本地存储加载记住的用户名和密码
onMounted(() => {
  const savedCredentials = localStorage.getItem("userCredentials");
  if (savedCredentials) {
    const { username: savedUsername, password: savedPassword } =
      JSON.parse(savedCredentials);
    username.value = savedUsername;
    password.value = savedPassword;
    remember.value = true;
  }
});

const onSubmit = async (values) => {
  loading.value = true;
  try {
    const res = await login(values);
    // 保存用户信息和 token
    mainStore.setToken(res.data.token);
    mainStore.setUserInfo(res.data.userInfo);

    // 如果选择了记住密码，保存到本地存储
    if (remember.value) {
      localStorage.setItem(
        "userCredentials",
        JSON.stringify({
          username: values.username,
          password: values.password,
        })
      );
    } else {
      localStorage.removeItem("userCredentials");
    }

    showToast("登录成功");
    router.push("/home");
  } catch (error) {
    showToast("登录失败：" + (error.message || "未知错误"));
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;

  .login-box {
    width: 90%;
    max-width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .title {
      text-align: center;
      margin-bottom: 20px;
      color: var(--primary-color);
    }

    .remember-box {
      padding: 10px 16px;
    }
  }
}
</style>
