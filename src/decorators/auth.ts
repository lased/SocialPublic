export function Auth(type: string = '-a') {
    return (target) => {
        target.prototype.ionViewCanEnter = async function () {
            if (this.navCtrl == undefined) {
                console.error('@Auth this.navCtrl not found');
            } else if (this.authProvider == undefined) {
                console.error('@Auth this.authProvider not found');
            } else {
                let auth, data;

                if(window.localStorage.getItem('token')){
                    data = await this.authProvider.checkAuth();                    
                    auth = data.ok;
                    window.localStorage.setItem('avatar', data.data.avatar);
                    window.localStorage.setItem('name', data.data.name);
                    window.localStorage.setItem('surname', data.data.surname);
                    window.localStorage.setItem('url', data.data.url);
                    window.localStorage.setItem('state', data.data.state);
                    window.localStorage.setItem('friends', JSON.stringify(data.data.friends));
                } else {
                    auth = false;
                }   

                this.authProvider.loggedIn = auth;                                     

                if (type == "-a" && !auth) {
                    setTimeout(() => {
                        this.navCtrl.setRoot('LoginPage');
                    }, 100);
                    return false;
                } else if (type == "-g" && auth) {
                    setTimeout(() => {
                        this.navCtrl.setRoot('NewsPage');
                    }, 100);
                    return false;
                }
                return true;
            }
            return false;
        }
    }
}