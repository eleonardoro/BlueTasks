import axios from 'axios';
import { useContext, useState } from 'react';
import { API_ENDPOINT } from '../constants';
import { AuthContext } from './useAuth';

export const useTasks = () => {

    const auth = useContext( AuthContext );
    const [taskList, setTaskList] = useState( [] );
    const [error, setError] = useState( null );
    const [processing, setProcessing] = useState( false );
    const [taskRemoved, setTaskRemoved] = useState( null );
    const [taskUpdated, setTaskUpdated] = useState( null );
    const [taskLoaded, setTaskLoaded] = useState( null );

    const list = async () => {
        try {
            setProcessing( true );
            setError( null );
            const response = await axios.get( `${ API_ENDPOINT }/tasks?sort=whenToDo,asc`, buildAuthHeader() );
            const content = response.data.content;

            if ( content.length === 1 && content[0].value && content[0].value.length === 0 )
                setTaskList( [] );
            else
                setTaskList( response.data.content );

            setProcessing( false );
        } catch ( e ) {
            handleError( e );
        }
    };

    const remove = async ( taskToRemove ) => {
        try {
            await axios.delete( `${ API_ENDPOINT }/tasks/${ taskToRemove.id }`, buildAuthHeader() );
            setTaskList( taskList.filter( task => task.id !== taskToRemove.id ) );
            setTaskRemoved( taskToRemove );

        } catch ( e ) {
            handleError( e );
        }
    };


    const save = async ( taskToSave, onlyStatus = false ) => {
        try {
            setProcessing( !onlyStatus );
            setTaskUpdated( null );
            setError( null );
            if ( taskToSave.id === 0 ) {
                await axios.post( `${ API_ENDPOINT }/tasks`, taskToSave, buildAuthHeader() );
            }
            else {
                await axios.put( `${ API_ENDPOINT }/tasks/${ taskToSave.id }`, taskToSave, buildAuthHeader() );
            }

            setProcessing( false );
            setTaskUpdated( taskToSave );
        } catch ( e ) {
            handleError( e );
        }
    };

    const load = async ( id ) => {
        try {
            setProcessing( true );
            setError( null );
            setTaskLoaded( null );
            const response = await axios.get( `${ API_ENDPOINT }/tasks/${ id }`, buildAuthHeader() );
            setTaskLoaded( response.data );
            setProcessing( false );
        } catch ( e ) {
            handleError( e );
        }

    };

    const buildAuthHeader = () => {
        return {
            headers: {
                'Authorization': `Bearer ${ auth.credentials.token }`
            }
        };
    };

    const clearTaskRemoved = () => {
        setTaskRemoved( null );
    };

    const clearTaskUpdated = () => {
        setTaskUpdated( null );
    };

    const clearTaskLoaded = () => {
        setTaskLoaded( null );
    };

    const handleError = ( error ) => {
        console.log( error );
        const resp = error.response;

        if ( resp && resp.status === 400 && resp.data ) {
            setError( resp.data.error );
        } else {
            setError( error.message );
        }

        setProcessing( false );
    };

    return { list, taskList, remove, taskRemoved, clearTaskRemoved, save, taskUpdated, clearTaskUpdated, load, taskLoaded, clearTaskLoaded, error, processing };

};  