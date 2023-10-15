function getGoogleAuthURL(){
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`
    const options = {
        redirect_uri: 'http://localhost:3000/users/google/callback' as string,//process.env.GOOGLE_REDIRECT_URL as string,
        client_id:'622733138674-7g450a1p9boso5n3tf6hnoutvv8c02lm.apps.googleusercontent.com' as string,//process.env.GOOGLE_CLIENT_ID as string,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope:[
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' ')
    }
    const qs = new URLSearchParams(options);
    return `${rootUrl}?${qs.toString()}`;
}

export default getGoogleAuthURL