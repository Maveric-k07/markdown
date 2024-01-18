import { writable, type Writable } from 'svelte/store';
import { auth } from '../lib/firebase/firebase';
import { signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export const authStore = writable({ user: null })

export const userHeader = writable({
    organization_id: '' as string | null,
    user_id: '' as string | null,
});




export const userUpdate = {
    setUserHeader: (response: { organization_id: ''; user_id: ''; }) => {
        userHeader.subscribe(value => console.log(value))
        function userUpdater(value: { organization_id: ''; user_id: ''; }) {
            userHeader.set(value)
        }
        userUpdater(response)
    }
}
export const loginEvent = writable(false);



export const authHandlers = {
    loginWithGoogle: () => {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(() => {
                const user = auth.currentUser;
                if (user) {
                    // localStorage.setItem('user', JSON.stringify({ user_id: user.uid }));
                    // localStorage.setItem('userHeader', JSON.stringify({ organization_id: user.tenantId, user_id: user.uid }));
                    let header = { organization_id: user.tenantId, user_id: user.uid } 
                    loginEvent.set(true);
                }
            })
            .catch(error => {
                console.error('Login with Google error:', error);
            });
    },

    logout: async () => {
        signOut(auth);
        localStorage.removeItem('user')
        localStorage.removeItem('request')
        localStorage.removeItem('userHeader')
    }
}



