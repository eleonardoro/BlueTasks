import axios from "axios";
import { AUTH_ENDPOINT, JWT_TOKEN_NAME } from "../constants.js";

class AuthService {

    login( username, password, onLogin ) {
        axios.post( `${ AUTH_ENDPOINT }/login`, { username: username, password: password } )
            .then( response => {
                const jwtToken = response.headers['authorization'].replace( "Bearer ", "" );
                sessionStorage.setItem( JWT_TOKEN_NAME, jwtToken );
                onLogin( true );
            } )
            .catch( error => {
                console.error( error );
                onLogin( false );
            } );
    }

    getJwtToken() {
        return sessionStorage.getItem( JWT_TOKEN_NAME );
    }

    isAuthenticated() {
        return this.getJwtToken() !== null;
    }

    logout() {
        sessionStorage.removeItem( JWT_TOKEN_NAME );
    }

    getJWTTokenData() {
        const jwtToken = this.getJwtToken();

        if ( jwtToken === null )
            return null;

        const jwtTokenData = atob( jwtToken.split( "." )[1] );
        return JSON.parse( jwtTokenData );
    }
}

export default new AuthService();