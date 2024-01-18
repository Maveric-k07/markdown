<script lang="ts">
  import { onAuthStateChanged } from "firebase/auth";
  import { auth } from "../lib/firebase/firebase";
  import { onMount } from "svelte";
  import { authHandlers } from "../stores/userStore";
  import Test from "./Markdown.svelte";

  let getAccess: boolean
  let user: any, userDomain: string | undefined;
    onMount(async () => {
      onAuthStateChanged(auth, (newUser) => {
        user = newUser;
        console.log(user);
  
        
        console.log(user);
        
        if (user) {
          userDomain = user.email?.split("@")[1];
        }
        if (userDomain === "amikus.ai") {
          // auth.tenantId = null;
          getAccess = true          
        } else {
          getAccess = false
        }
      });
    });

    let loading = false;

  async function handleLoginWithGoogle() {
      try {
        loading = true;
        authHandlers.loginWithGoogle();
      } catch (error) {
        loading = false;
        console.error("Error signing in with Google:", error);
      }
    }
  
  async function handleLogout () {
    authHandlers.logout()
    getAccess = false
  }
</script>

{#if user}

{#if getAccess}
<button on:click={authHandlers.logout}>logout</button>
<Test />
<!-- Hello Looser! -->
{:else}
<h1>You donot have the permissions to view this website please sign in with a <a on:click={handleLogout} href="/">valid account.</a></h1>
{/if}
{:else}

  Hello User!
  
  <div class="sign-in-wrapper ">
    <div class="">
      <div class="">
        <img class="login-img rounded-l-lg" src="/login.png" alt="" srcset="" />
      </div>
      <!-- <h2>Sign In with Google</h2> -->
      <div
        class=""
      >
        <button
          type="submit"
          on:click={handleLoginWithGoogle}
          class="button"
        >
          <img
            class="google"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span class="text-black">Login with Google</span>
        </button>
        <br />
        <p class=" font-light text-xs">Powered by <a class="text-[#fd6262]" href="https://www.amikus.ai/" target="_blank">Amikus AI</a> </p>
      </div>
    </div>
  </div>
{/if}


<style>
  .button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .google{
    width: 1.5rem;

  }
</style>