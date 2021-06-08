<template>
  <div
    class="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-50
      py-12
      px-4
      sm:px-6
      lg:px-8
    "
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" method="POST" @submit.prevent="signIn">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required=""
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-t-md
                focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                focus:z-10
                sm:text-sm
              "
              placeholder="Email address"
              v-model.trim="email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required=""
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-b-md
                focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                focus:z-10
                sm:text-sm
              "
              placeholder="Password"
              v-model="password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="
              group
              relative
              w-full
              flex
              justify-center
              py-2
              px-4
              border border-transparent
              text-sm
              font-medium
              rounded-md
              text-white
              bg-indigo-600
              hover:bg-indigo-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
            "
            :class="{
              'opacity-50 pointer-events-none': isLoading,
            }"
          >
            Sign in
          </button>
        </div>
      </form>
      <template v-if="errMessage && isVisible">
        <toast :err="errMessage" />
      </template>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/login";
import { setItem } from "@/helpers/storage";

export default {
  name: "App",
  components: {
    Toast: () => import("@/components/Toast"),
  },

  data() {
    return {
      email: "",
      password: "",
      errMessage: null,
      isLoading: false,
      isVisible: true,
    };
  },

  methods: {
    async signIn() {
      this.isLoading = true;
      try {
        const data = await login({
          email: this.email,
          password: this.password,
        });

        if (!data.data.error) {
          setItem("accessToken", data.data.message);
          this.email = "";
          this.$router.push({ name: "channels" });
        } else {
          this.errMessage = data.data.message;
        }

        this.password = "";
        this.isLoading = false;
        this.isVisible = true;

        setTimeout(() => {
          this.isVisible = false;
        }, 2000);
      } catch (err) {
        this.isLoading = false;
        return err;
      }
    },
  },
};
</script>
